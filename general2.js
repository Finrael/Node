import { XMLParser } from 'fast-xml-parser';
import { readFileSync } from 'fs';
const xmlFile = readFileSync(`${process.cwd()}/employees.xml`, 'utf8');
const parser = new XMLParser();
const json = parser.parse(xmlFile);

// console.log(`First item: `, json.employees.employee[0]);
// general average
const calcGeneralAverage = ()=>{
    let acc = 0;
    const employeeData  = json.employees.employee
    let expectationCount = 0
    for (let i = 0 ; i<employeeData.length;i++){
        const salaryExpectation = employeeData[i].salary
        if(salaryExpectation!=0){
            acc = acc+ employeeData[i].salary
            expectationCount++
        }
       
    }
    let result = Math.round((( acc/expectationCount) + Number.EPSILON) * 100) / 100 
    console.log(`There are ${expectationCount} entries with salary disclosed out of a total of ${employeeData.length}, for an average of ${result} thousand a year`)
    return result
}

const categoriesAverage = ()=>{
    const employeeData  = json.employees.employee
    const generalAverage = calcGeneralAverage();
//categories average

//get a list of every category
let listOfCategories =[...new Set(employeeData.map(ele =>{
    const auxObj = {
        'category' : ele.category,
        'employeeNumber' : 0,
        'average':0 ,
    }
    return ele.category
}))]

 //map every category to an object with counters
let categoriesAcc = listOfCategories.map(ele=>{
    // console.log('ele', ele)
      const auxObj = {
        'category' : ele,
        'employeeNumber' : 0,
        'employeeDisclosed':0,
        'average':0 ,
    }
    return auxObj
})

let auxAcc = categoriesAcc.map(ele=>{
    const currentCategory= ele.category;
    const auxArr =  employeeData.filter(internalEle=>{
        return internalEle.category === currentCategory
    })
    // const auxArr =  employeeData.map(internalEle=>{
    //     if(internalEle.category === currentCategory){
    //         return internalEle.
    //     }else{

    //     }
    //     return 

    // })
    
    let disclosedSalary =  auxArr.filter(ele=>ele.salary.toString()!=='0')
   
    let numEmployees =auxArr.length | 0;
    let numEmployeesFiltered = disclosedSalary.length
    let salaryAcc =0

    for (let i = 0 ; i<disclosedSalary.length;i++){
// console.log('salary', disclosedSalary[i])
        salaryAcc = salaryAcc +parseFloat(disclosedSalary[i].salary)
    }
    salaryAcc =salaryAcc/disclosedSalary.length | 0
    console.log('this is disclosed salary', auxArr)


    // let acc=0
    // let expectationCount=0;
    // for (let i = 0 ; i<auxArr.length;i++){
    //     console.log('auxarer', auxArr[i])
    //     const salaryExpectation = parseInt(auxArr[i].salary)
    //     console.log('=================================', salaryExpectation)
    //     if(salaryExpectation.toString()!=='0'){
    //         acc = acc+ parseInt(auxArr[i].salary)
    //         console.log('----------->>', acc)
    //         expectationCount++
    //     }
    // }
   
    // ele.employeeNumber= auxArr.length || 0 
    // ele.employeeDisclosed = expectationCount
    // ele.average =  acc/expectationCount
    
    // console.log('-----------', auxArr[0])
    return auxArr
})
// console.log('categories', auxAcc[1])
// console.log('employees', employeeData[0])
}
categoriesAverage();