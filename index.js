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

let generateCredentials = () => {
  return grpc.credentials.createSsl(
      fs.readFileSync(
          '../certificates/certificatesChain/grpc-root-ca-and-grpc-server-ca-and-grpc-client-ca-chain.crt'),
      fs.readFileSync('../certificates/clientCertificates/grpc-client.key'),
      fs.readFileSync('../certificates/clientCertificates/grpc-client.crt')
  );
}

let grpcClient = new EmployeeService(`localhost:50051`, generateCredentials());

let employeeId;

if (process.argv.length >= 3) {
  employeeId = process.argv[2];
} else {
  employeeId = 1;
}

client.getEmployeeDetails(grpcClient, employeeId);

