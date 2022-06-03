import SimpleSchema from 'simpl-schema';

const majNoteSiteSchema = new SimpleSchema({
  _id : { type : String, optional : true, max : 25 },
  id : { type : String, max : 25 },
  laNObj : Object,
  'laNObj.mailClient' : { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 }, 
  'laNObj.noteClient' : { type : Number, min : 0, max : 5 }, 
  'laNObj.dateNote' : Date,
  laN : { type : Number, min : 0, max : 5 },
  leMail : { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 },
  nExists : { type : String, allowedValues: ['OUI', 'NON'], max : 3 }
}, {check}).newContext();

Meteor.methods({
  ajoutNote(nN){
    majNoteSiteSchema.validate(nN);
    if (majNoteSiteSchema.isValid()) {
      const si = Sites.findOne({_id : nN.id});
      if (nN.nExists == 'OUI') { nN.laN = ((si.siteNote * si.siteVotants.length) + nN.laN) / (si.siteVotants.length + 1); }
console.log(Math.round(nN.laN, -1));
      nN.laN = Math.round(nN.laN, -1);
      Sites.update({_id : nN.id}, { $push : { siteLesNotes : nN.laNObj }});
      Sites.update({_id : nN.id}, { $push : { siteVotants : nN.leMail }});
      Sites.update({_id : nN.id}, { $set : { siteNote : nN.laN }});
      return 'sent';
    }
    else { return majNoteSiteSchema.validationErrors(); }
  },

  modifNote(nN){
    majNoteSiteSchema.validate(nN);
    if (majNoteSiteSchema.isValid()) {
      const s = Sites.findOne({_id : nN.id});
      const found = s.siteLesNotes.find(element => element.mailClient == nN.leMail);
      const ancienneNote = found.noteClient;
      if (nN.nExists == 'OUI') { nN.laN = ((s.siteNote * s.siteVotants.length) - ancienneNote + nN.laN) / s.siteVotants.length; }
console.log(Math.round(nN.laN, -1));
      nN.laN = Math.round(nN.laN, -1);
      Sites.update({_id : nN.id}, { $pull: { siteLesNotes : { mailClient : nN.leMail }}});
      Sites.update({_id : nN.id}, { $push : { siteLesNotes : nN.laNObj }});
      Sites.update({_id : nN.id}, { $set : { siteNote : nN.laN }});
      return 'sent';
    }
    else { return majNoteSiteSchema.validationErrors(); }
  }
});

