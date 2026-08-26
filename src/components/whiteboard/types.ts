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