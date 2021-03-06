const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {

    it('should throw an error if no "name" arg', () => {
        const dep = new Department({}); // create new Department, but don't set `name` attr value
      
        dep.validate(err => {
          expect(err.errors.name).to.exist;
        });
      });

      after(() => {
        mongoose.models = {};
    });

      it('should throw an error if "name" is not a string', () => {

        const cases = [{}, []];
        for(let name of cases) {
          const dep = new Department({ name });
      
          dep.validate(err => {
            expect(err.errors.name).to.exist;
          });
      
        }
      
      });
      it('should throw error if name is too short or too long', () => {
        const cases = ['pies' , ' kot, żeby nie czuł się bardzo pokrzywdzony'];
        for( let name of cases) {
            const dep = new Department({ name });
            dep. validate(err => {
                expect(err.errors.name).to.exist;
            });
        }
      });
      it('should not throw error in case of name is correct', () => {
        const cases = ['Warszawa', 'piesek', 'FC Barcelona'];
        for(let name of cases){
            const dep = new Department({ name });
            dep.validate(err => {
                expect(err).to.not.exist;
            });
        }
      });
  
  });