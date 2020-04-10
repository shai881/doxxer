const neo4j = require('neo4j-driver').v1;
var parser = require('parse-neo4j').parse;
const _ = require('lodash');

const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "123456"));
const session = driver.session();

var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

async function start() {
    const personName = 'shai';
    const result = await session.run(
        'match (n:Person{name:"shai"})-[r1]->(b) return {relestion:type(r1),of:b}'
    );

    var rrr = await parser(result);
    const aaaa = _.mapValues(_.groupBy(rrr, 'relestion'),
    clist => clist.map(car => car.of));
    session.close();
    driver.close();
}



start();

/*

 const aaaa = _.mapValues(_.groupBy(rrr, 'relestion'), clist => {
        for(let i =0;i<clist.length;i++){
            clist[i] = clist[i].of;
        }
        return clist;
    });

    */