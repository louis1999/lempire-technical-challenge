import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { ExportsCollection } from '/imports/db/exports/ExportsCollection';
import { mockMethodCall } from 'meteor/quave:testing';
import '/imports/api/exports/ExportsMethods';
import { assert } from 'chai';

if (Meteor.isServer) {
  describe('Exports', () => {
    describe('methods', () => {
      const userId = Random.id();
      let exportId;

      beforeEach(() => {
        ExportsCollection.remove({});
        exportId = ExportsCollection.insert({
          title: 'Test export',
          progression:0,
          createdAt: new Date(),
          userId,
        });
      });




      it('can delete owned export', () => {
        mockMethodCall('exports.remove', exportId, { context: { userId } });

        assert.equal(ExportsCollection.find().count(), 0);
      });


      it(`can't delete export without an user authenticated`, () => {
        const fn = () => mockMethodCall('exports.remove', exportId);
        assert.throw(fn, /Not authorized/);
        assert.equal(ExportsCollection.find().count(), 1);
      });

      it(`can't delete export from another owner`, () => {
        const fn = () =>
          mockMethodCall('exports.remove', exportId, {
            context: { userId: 'somebody-else-id' },
          });
        assert.throw(fn, /Access denied/);
        assert.equal(ExportsCollection.find().count(), 1);
      });


      it('can insert new exports', () => {
        const title = 'New Export';
        mockMethodCall('exports.insert', title, {
          context: { userId },
        });

        const exports = ExportsCollection.find({}).fetch();
        assert.equal(exports.length, 2);
        assert.isTrue(exports.some(e => e.title === title));
      });






    });
  });
}

