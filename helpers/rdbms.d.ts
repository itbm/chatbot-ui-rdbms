import { RDBMSUser } from '../types/rdbms';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
export declare const getDataSource: () => Promise<DataSource>;
export declare const getUser: (dataSource: DataSource, id: string) => Promise<RDBMSUser>;
