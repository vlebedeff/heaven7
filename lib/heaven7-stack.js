"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heaven7Stack = void 0;
const cdk = require("aws-cdk-lib");
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
class Heaven7Stack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const vpc = new aws_ec2_1.Vpc(this, 'heaven7-vpc', {
            subnetConfiguration: [
                { name: 'heaven7-public-subnet', cidrMask: 24, subnetType: aws_ec2_1.SubnetType.PUBLIC }
            ]
        });
    }
}
exports.Heaven7Stack = Heaven7Stack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdmVuNy1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlYXZlbjctc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBQ25DLGlEQUFvRDtBQUdwRCxNQUFhLFlBQWEsU0FBUSxHQUFHLENBQUMsS0FBSztJQUN6QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sR0FBRyxHQUFHLElBQUksYUFBRyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDdkMsbUJBQW1CLEVBQUU7Z0JBQ25CLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLG9CQUFVLENBQUMsTUFBTSxFQUFFO2FBQy9FO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBVkQsb0NBVUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHtTdWJuZXRUeXBlLCBWcGN9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1lYzInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBjbGFzcyBIZWF2ZW43U3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCB2cGMgPSBuZXcgVnBjKHRoaXMsICdoZWF2ZW43LXZwYycsIHtcbiAgICAgIHN1Ym5ldENvbmZpZ3VyYXRpb246IFtcbiAgICAgICAgeyBuYW1lOiAnaGVhdmVuNy1wdWJsaWMtc3VibmV0JywgY2lkck1hc2s6IDI0LCBzdWJuZXRUeXBlOiBTdWJuZXRUeXBlLlBVQkxJQyB9XG4gICAgICBdXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==