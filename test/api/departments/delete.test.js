const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments', () => {
    before(async () => {
        const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
        await testDepOne.save();

        const testDepTwo = new Department({ _id: '522222222222222222222228', name: 'Department #1' });
        await testDepTwo.save();
      });
      
      after(async () => {
        await Department.deleteMany();
      });
      it('should delete data without mistakes', async() => {
        const res = await request(server).delete('/api/departments/522222222222222222222228');
        const deletedDep = await Department.findOne({ _id: '522222222222222222222228'});
        expect(res.status).to.be.equal(200);
        expect(deletedDep).to.be.null;
      });
});