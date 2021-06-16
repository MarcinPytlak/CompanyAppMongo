const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    it('should throw error without required arguments', () => {
        const emp = new Employee({});
        emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        });
    });
    after(() => {
        mongoose.models = {};
    });
    it('should return error when type is incorrect', () => {
        const cases = [
            {firstName : 12, lastName: 'Pytlak', department : null},
            {firstName : 'Marcin', lastName: 'Pytlak', department: 12},
            {firstName: 'Marcin', lastName: 3 , department: 'IT'},
        ];
        for(let employee of cases) {
            const emp = new Employee({ employee });
            emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
            });
        }
    });
    it('should return error when data is missing', () => {
        const cases = [
            {firstName : 12, department : null},
            {firstName : 'Marcin', lastName: 'Pytlak'},
            {lastName: 3 , department: 'IT'},
        ];
        for(let employee of cases) {
            const emp = new Employee({ employee });
            emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
            });
        }
    });
    it('should not throw error in case of data is correct', () => {
        const emp = new Employee({ firstName: 'Marcin', lastName: 'Pytlak', department: 'IT'});
        emp.validate(err => {
            expect(err).to.not.exist;
        });
      });
});