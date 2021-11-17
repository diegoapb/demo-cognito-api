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

    // Function that returns 201 with hello world
    const helloWorldFunction = new Function(this, "HelloWorldFunction", {
      runtime: Runtime.NODEJS_14_X,
      code: AssetCode.fromAsset("../src"),
      handler: "hello-world.handler",
    });

    // Rest API that returns hello world
    const helloWorldLambdaRestApi = new LambdaRestApi(
      this,
      "HelloWorldLambdaRestApi",
      {
        handler: helloWorldFunction,
        restApiName: "HelloWorldLambdaRestApi",
        proxy: false,
      }
    );

    // Hello Resource API for the REST API.
    const helloResource = helloWorldLambdaRestApi.root.addResource("hello");

    // GET method for the HELLO API resource. It uses Cognito for
    // authorization and the auathorizer defined above.
    helloResource.addMethod(
      "GET",
      new LambdaIntegration(helloWorldFunction, {})
    );
  }
}
