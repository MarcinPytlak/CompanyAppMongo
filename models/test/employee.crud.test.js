const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

describe('Employee', () => {
    before(async () => {
        try {
            const fakeDB = new MongoMemoryServer();
            const uri = await fakeDB.getConnectionString();
            await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
            console.log(err);
        }
    });
    after(() => {
        mongoose.models = {};
      });

    describe('Reading data', () => {
        before(async () => {
            const testEmpOne = new Employee({ firstName : 'Marcin', lastName: 'Pytlak', department : 'IT'});
            await testEmpOne.save();
   
            const testEmpTwo = new Employee({ firstName : 'Edyta', lastName: 'Bloch', department : 'IT'});
            await testEmpTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });

        it('should return proper document by various params with "findOne" method', async () => {
            const employee = await Employee.findOne({ lastName: 'Bloch' });
            expect(employee.lastName).to.be.equal('Bloch');
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });
    describe('Creating data', () => {
        it('should insert new document with insertOne method', async() => {
            const employee = new Employee({ firstName: 'Dariusz', lastName: 'Pytlak', department: 'Marketing'});
            await employee.save();
            expect(employee.isNew).to.be.false;
        });
    });
    describe('Updating Data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName : 'Marcin', lastName: 'Pytlak', department : 'IT'});
            await testEmpOne.save();
   
            const testEmpTwo = new Employee({ firstName : 'Edyta', lastName: 'Bloch', department : 'IT'});
            await testEmpTwo.save();
        });

    it('it should propertly update one document with updateOne method', async() => {
        await Employee.updateOne({ firstName : 'Marcin'}, { $set : { department : 'Dealer'}});
        const updatedEmployee = await Employee.findOne({ department: 'Dealer'});
        expect(updatedEmployee).to.not.be.null;
    });
    it('should properly update one document with "save" method', async() => {
        const employee = await Employee.findOne({ firstName: 'Marcin' });
        employee.firstName = '=Marcin=';
        await employee.save();
      
        const updatedEmployee = await Employee.findOne({ firstName: '=Marcin=' });
        console.log(updatedEmployee);
        expect(updatedEmployee).to.not.be.null;
      });
    it('should properly update multiple documents with "updateMany" method', async () => {
        await Employee.updateMany({}, { $set: { lastName: 'Updated!' }});
        const employees = await Employee.find({ lastName: 'Updated!' });
        expect(employees.length).to.be.equal(2);
      });
    afterEach(async () => {
        await Employee.deleteMany();
      });
    });
    describe('Delete data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName : 'Marcin', lastName: 'Pytlak', department : 'IT'});
            await testEmpOne.save();
   
            const testEmpTwo = new Employee({ firstName : 'Edyta', lastName: 'Bloch', department : 'IT'});
            await testEmpTwo.save();
        });
        afterEach(async () => {
            await Employee.deleteMany();
          });
          it('should remove document with deleteOne method', async()=> {
            await Employee.deleteOne({ firstName: 'Marcin'});
            const removedEmployee = await Employee.findOne({firstName: 'Marcin'});
            expect(removedEmployee).to.be.null;
          });
          it('should properly remove one document with remove method', async () => {
            const employee = await Employee.findOne({ firstName: 'Marcin' });
            await employee.remove();
            const removedEmployee = await Employee.findOne({ firstName: 'Marcin' });
            expect(removedEmployee).to.be.null;
          });
          it('should properly remove multiple documents with "deleteMany" method', async()=> {
            await Employee.deleteMany();
            const employeeLength = await Employee.find();
            expect(employeeLength.length).to.be.equal(0);
          });
    });
});