import * as cdk from "aws-cdk-lib";
import { Alarm, ComparisonOperator, Metric } from "aws-cdk-lib/aws-cloudwatch";
import { Ec2Action, Ec2InstanceAction } from "aws-cdk-lib/aws-cloudwatch-actions";
import {
  InstanceType,
  Instance,
  InstanceClass,
  InstanceSize,
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
  Vpc,
  UserData,
  CfnEIP,
  MachineImage,
} from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { readFileSync } from "fs";

export class Heaven7Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    const suffix = scope.node.tryGetContext("heaven7/suffix");
    const name = `${id}-${suffix}`;
    super(scope, name, {
      description: `Heaven7: Virtual Development Environment (${suffix})`,
      ...props,
    });

    const vpc = new Vpc(this, "vpc", {
      subnetConfiguration: [
        {
          name: "public-subnet",
          cidrMask: 24,
          subnetType: SubnetType.PUBLIC,
        },
      ],
    });

    const securityGroup = new SecurityGroup(this, "sg", { vpc, allowAllOutbound: true });
    const trustedIps = this.node.tryGetContext("heaven7/trusted-ips") as Array<String>;
    const ingressPorts = this.node.tryGetContext("heaven7/ingress-ports") as Array<number>;
    trustedIps.forEach((trustedIp) => {
      securityGroup.addIngressRule(Peer.ipv4(`${trustedIp}/32`), Port.tcp(22), `Heaven7: Allow SSH from ${trustedIp}`);
      securityGroup.addIngressRule(
        Peer.ipv4(`${trustedIp}/32`),
        Port.udpRange(60000, 61000),
        `Heaven7: Allow Mosh from ${trustedIp}`
      );
      ingressPorts.forEach((ingressPort) =>
        securityGroup.addIngressRule(Peer.ipv4(`${trustedIp}/32`), Port.tcp(ingressPort))
      );
    });

    const userData = readFileSync("./lib/user-data.sh", "utf8");
    const keyName = this.node.tryGetContext("heaven7/key-name");
    const instance = new Instance(this, "instance", {
      vpc,
      vpcSubnets: { subnetType: SubnetType.PUBLIC },
      securityGroup,
      instanceType: InstanceType.of(InstanceClass.C6I, InstanceSize.XLARGE2),
      machineImage: MachineImage.genericLinux({
        "eu-central-1": "ami-084872984773e3cde",
        "us-east-2": "ami-024e6efaf93d85776",
      }),
      keyName,
      userData: UserData.custom(userData),
    });

    const eip = new CfnEIP(this, "eip", {
      instanceId: instance.instanceId,
    });

    const alarm = new Alarm(this, "sleep", {
      metric: new Metric({
        namespace: "AWS/EC2",
        metricName: "NetworkOut",
        dimensionsMap: { InstanceId: instance.instanceId },
        period: cdk.Duration.minutes(5),
        statistic: "sum",
      }),
      threshold: 2048,
      evaluationPeriods: 6,
      datapointsToAlarm: 6,
      comparisonOperator: ComparisonOperator.LESS_THAN_OR_EQUAL_TO_THRESHOLD,
      alarmDescription: "Shutdown EC2 instance after 30 minutes of network inactivity",
    });
    alarm.addAlarmAction(new Ec2Action(Ec2InstanceAction.STOP));

    new cdk.CfnOutput(this, "InstanceIP", { value: eip.attrPublicIp });
    new cdk.CfnOutput(this, "InstanceID", { value: instance.instanceId });
  }
}
