const { Command } = require("commander");
const inquirer = require("inquirer");

const program = new Command();

// Member Questions
const Questions = [
  {
    type: "input",
    name: "firstName",
    message: "Enter your first name: ",
  },
  {
    type: "input",
    name: "secondName",
    message: "Enter your second name: ",
  },
  {
    type: "input",
    name: "emailID",
    message: "Enter your email ID: ",
  },
  {
    type: "input",
    name: "password",
    message: "Enter your password: ",
  },
  {
    type: "input",
    name: "age",
    message: "Enter your age: ",
  },
  {
    type: "input",
    name: "aadharNo",
    message: "Enter your Aadhar number: ",
  },
  {
    type: "input",
    name: "panNo",
    message: "Enter your PAN number: ",
  },
  {
    type: "input",
    name: "voterID",
    message: "Enter your voter ID: ",
  },
];

// testing
program.version("2.0.0").description("Banking System project");

// without using inquirer

// program
//   .command(
//     "add <firstName> <lastName> <emailID> <password> <age> <phoneNo> <aadharNo> <panNo> <voterID>"
//   )
//   .alias("a")
//   .description("Member info")
//   .action(
//     (
//       firstName,
//       lastName,
//       emailID,
//       password,
//       age,
//       phoneNo,
//       aadharNo,
//       panNo,
//       voterID
//     ) => {
//       addMember({
//         firstName,
//         lastName,
//         emailID,
//         password,
//         age,
//         phoneNo,
//         aadharNo,
//         panNo,
//         voterID,
//       });
//     }
//   );

// add command
program
  .command("add")
  .alias("a")
  .description("member added")
  .action(() => {
    // inquirer.prompt(Questions).then((answers) => addMember(answers));
    inquirer.prompt(Questions).then((error)=>{
        console.log(error);
    });
  });

//find command
program
  .command("find <name>")
  .alias("f")
  .description("find member")
  .action((name) => {
    findMember(name);
  });

// update command
program
  .command("update <_id>")
  .alias("u")
  .description("update member details")
  .action((_id) => {
    inquirer.prompt(Questions).then((answers) => {
      updateMember(_id, answers);
    });
  });

// remove command
program
  .command("remove <_id>")
  .alias("d")
  .description("member is removed.")
  .action((_id) => {
    removeMember(_id);
  });

// list members

program
  .command("list")
  .alias("l")
  .description("list the members")
  .action(() => {
    console.log("list is printed.");
  });
program.parse(process.argv);
