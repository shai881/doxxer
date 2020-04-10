const neo4j = require('neo4j-driver').v1;
var parser = require('parse-neo4j').parse;
const _ = require('lodash');

const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "123456"));
const session = driver.session();

async function getAllNodes(){
    const query = "match (n) return n;"
    const result = await session.run(query);
    session.close();
    driver.close();
    return await parser(result);
}

async function getNodeById(id){
    ///TODO: validate id

    const query = `match (n) where id(n)=${id} return n`
    const result = await session.run(query);
    session.close();
    driver.close();
    const parsedResult = await parser(result);
    if(parsedResult.length === 1){
        return parsedResult[0];
    }
    /// throw exeption
}

async function getNodeByProperties(properties){
    ///TODO: validate properties
    const propertiesToSearch = stringify(properties);
    const query = `match (n${propertiesToSearch}) return n`
    const result = await session.run(query);
    session.close();
    driver.close();
    const parsedResult = await parser(result);
    return parsedResult;
}

function stringify(obj_from_json){
    if(typeof obj_from_json !== "object" || Array.isArray(obj_from_json)){
        // not an object, stringify using native function
        return JSON.stringify(obj_from_json);
    }
    // Implements recursive object serialization according to JSON spec
    // but without quotes around the keys.
    let props = Object
        .keys(obj_from_json)
        .map(key => `${key}:${stringify(obj_from_json[key])}`)
        .join(",");
    return `{${props}}`;
}

async function insertNode(properties,labels){
    const labelsString = buildlabels(labels);
    const propertiesToSearch = stringify(properties);
    const query = `create (n${labelsString}${propertiesToSearch}) return n`
    const result = await session.run(query);
    session.close();
    driver.close();
    const parsedResult = await parser(result);
    return parsedResult;
}

async function removeNodeById(id){
    ///TODO: validate id

    const query = `match (n) where id(n)=${id} detach delete n`
    const result = await session.run(query);
    session.close();
    driver.close();
    const parsedResult = await parser(result);

    /// check if the id exist and if it got removed
}

async function removeNodesByProperties(properties){}
async function getNodeReleshenships(id){}
async function removePropertyFromNode(id){}
async function serachNodesWithLable(id){}
async function removeNodesWithLable(id){}
async function removeLable(id){}
async function addLableToNode(id){}


function buildlabels(labels){
    if(typeof(labels)=== "string"){
        return ":"+labels;
    }
    if(Array.isArray(labels) && !!allArrayIsString(labels)){
        let labelsString = '';
        for(label of labels){
            labelsString += ":"+label;
        }
        return labelsString;
    }
    return '';
}


function allArrayIsString(array) {
    return array.every(function(i){ return typeof i === "string" });
}


removeNodeById(87);