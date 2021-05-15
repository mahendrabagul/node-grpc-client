'use strict';

const PROTO_PATH = __dirname + '/protos/employee.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const client = require("./client");
const fs = require('fs');

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

let credentials = grpc.credentials.createSsl(
    fs.readFileSync(
        '../certificates/certificatesChain/grpc-root-ca-and-grpc-server-ca-chain.crt'),
);

grpcClient = new EmployeeService(`localhost:50051`, credentials);

let employeeId;

if (process.argv.length >= 3) {
  employeeId = process.argv[2];
} else {
  employeeId = 1;
}

client.getEmployeeDetails(grpcClient, employeeId);

