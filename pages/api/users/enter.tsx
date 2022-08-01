import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
// import smtpTransport from "@libs/server/email";
import type { NextApiRequest, NextApiResponse } from "next";


const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

//req.body는 조회불가면 headers를 설정해야한다
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : { email };
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  // return res.json({
  //   ok: true,
  // });
  return res.status(200).end();
}

export default withHandler("POST", handler);

// console.log("페이로드:",payload)
// if (phone) {
//   console.log("if 진입");
//   const message = await twilioClient.messages.create({
//     messagingServiceSid: process.env.TWILIO_MSID,
//     to: process.env.MY_PHONE!,
//     body: `로그인 토큰은 ${payload}입니다.`,
//   });
//   console.log(message);
// }
// if (email) {
//   console.log("메일 진입");
//   const mailOptions = {
//     from: process.env.MAIL_ID,
//     to: email,
//     subject: "Nomad Carrot Authentication Email",
//     text: `Authentication Code : ${payload}`,
//   };
//   const result = await smtpTransport.sendMail(
//     mailOptions,
//     (error, responses) => {
//       if (error) {
//         console.log(error);
//         return null;
//       } else {
//         console.log(responses);
//         return null;
//       }
//     }
//   );
//   smtpTransport.close();
//   console.log("결과",result);
// }



  // const payload = Math.floor(100000 + Math.random() * 900000) + "";
  // const token = await client.token.create({
  //   data: {
  //     payload,
  //     user: {
  //       connectOrCreate: {
  //         where: {
  //           ...user,
  //         },
  //         create: {
  //           name: "Anonymous",
  //           ...user,
  //         },
  //       },
  //     },
  //   },
  // });
// if(phone){
//   user = await client.user.upsert({
//     where:{
//       phone:+phone,
//     },
//     create:{
//       name:"Jone doe",
//       phone:+phone
//     },
//     update:{

//     }
//   })
// }else if(email){
//   user = await client.user.upsert({
//     where:{
//       email,
//     },
//     create:{
//       name:"Jone doe",
//       email
//     },
//     update:{

//     }
//   })
// }

//   if(email){
//      user = await client.user.findUnique({
//       where:{
//         email,
//       }
//     })
//     if(user){console.log("found it")}
//     if(!user){
//       console.log("Will create")
//       user= await client.user.create({
//         data:{
//           name:"seo",
//           email
//         }
//       })
//     }
//     console.log(user)
//   }
//   if(phone){
//     user = await client.user.findUnique({
//      where:{
//       phone:Number(phone),
//      }
//    })
//    if(user){console.log("found it")}
//    if(!user){
//      console.log("Will create")
//      user= await client.user.create({
//        data:{
//          name:"seo",
//          phone:Number(phone)
//        }
//      })
//    }
//    console.log(user)
//  }
