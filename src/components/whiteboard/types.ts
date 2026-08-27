import type { Node } from "@xyflow/react";

export type AwsComponentType =
  | "apiGateway"
  | "lambda"
  | "ec2"
  | "s3"
  | "dynamodb"
  | "sqs";

export type AwsComponentCategory =
  | "compute"
  | "storage"
  | "database"
  | "messaging";

export type AwsComponent = {
  type: AwsComponentType;
  label: string;
  category: AwsComponentCategory;
};

export type AwsNodeData = {
  label: string;
  type: AwsComponentType;
  category: AwsComponentCategory;
};

export type AwsNode = Node<AwsNodeData, "aws">;
