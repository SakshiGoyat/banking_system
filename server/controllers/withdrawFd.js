const fdSchema = require("../models/fdSchema");
const userSchema = require("../models/userSchema");

module.exports = async (req, res) => {
  const { account, token } = req.body.data;

  // console.log(req.body.data);

  if (!account || !token) {
    res.json({ error: "fills credentials properly." });
  }

  const fduser = await fdSchema.find({ accountNumber: account, token: token });

//   if(fduser.accountNumber === undefined){
//     res.json({error: "User is not found."});
//     return;
//   }
//   console.log(fduser[0].name);
  const i = fduser[0].interest;
  const minT = fduser[0].min;
  const maxT = fduser[0].max;
  let amount = fduser[0].amount;
  const date = fduser[0].fdDate;

  const currentDate = new Date();

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
//   const year = day * 365;

  const time = currentDate.getTime() - date.getTime();
  const depositTime = time/day;
  console.log(depositTime);

  if(depositTime < minT){
    res.json({message: "Your fd deposit time is not completed."});
    return;
  }

  if(depositTime < maxT){
    amount = amount*i*(depositTime);
  }

//   console.log("P1");
  if(depositTime >= maxT){
    amount = amount*i*maxT;
  }


  res.json({ message: "successful", amount: amount });
  
  const updateUser = await userSchema.updateOne({accountNumber: account}, {
    $set: {
        bankBalance: Number(req.authuser.bankBalance + amount)
    }
  });

  console.log(updateUser);

  const deleteUser = await fdSchema.deleteOne({accountNumber: account, token: token});

  console.log(deleteUser);
};
