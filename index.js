'use strict';

const PROTO_PATH = __dirname + '/protos/employee.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const client = require("./client");

let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    }
);

let EmployeeService = grpc.loadPackageDefinition(
    packageDefinition).employee.EmployeeService;

let grpcClient;

grpcClient = new EmployeeService(`localhost:50051`,
    grpc.credentials.createInsecure());

let employeeId;

if (process.argv.length >= 3) {
  employeeId = process.argv[2];
} else {
  employeeId = 1;
}

client.getEmployeeDetails(grpcClient, employeeId);

