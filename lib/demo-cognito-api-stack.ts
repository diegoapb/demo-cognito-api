import {
  LambdaRestApi,
  CfnAuthorizer,
  LambdaIntegration,
  AuthorizationType,
  Authorizer,
} from "@aws-cdk/aws-apigateway";
import { AssetCode, Function, Runtime } from "@aws-cdk/aws-lambda";
import { App, Stack, Construct, StackProps } from "@aws-cdk/core";
import { UserPool } from "@aws-cdk/aws-cognito";

export class DemoCognitoApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Function that returns 201 with "Hello world!"
    const helloWorldFunction = new Function(this, "helloWorldFunction", {
      code: new AssetCode("src"),
      handler: "helloworld.handler",
      runtime: Runtime.NODEJS_12_X,
    });

    // Rest API backed by the helloWorldFunction
    const helloWorldLambdaRestApi = new LambdaRestApi(
      this,
      "helloWorldLambdaRestApi",
      {
        restApiName: "Hello World API",
        handler: helloWorldFunction,
        proxy: false,
      }
    );

    // Hello Resource API for the REST API.
    const hello = helloWorldLambdaRestApi.root.addResource("HELLO");
    const helloIntegration = new LambdaIntegration(helloWorldFunction);
    hello.addMethod("GET", helloIntegration);
    
  }
}
