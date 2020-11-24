import { Request, Response, NextFunction } from "express";
import userModel from "../models/user/user";

export const updateUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      company = "",
      dob = "",
      state = "",
      lga = "",
      lat = "",
      long = "",
      userRole = [],
      crops = [],
    } = req.body;
    console.log(req.body);
    const { userId } = req.userData!;
    const newUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(company && { company }),
          ...(dob && { dob }),
          ...(state && { state }),
          ...(lga && { lga }),
          ...(lat && { lat }),
          ...(long && { long }),
          ...(userRole.length > 0 && { userRole }),
          ...(crops.length > 0 && { crops }),
        },
      },
      { new: true, upsert: true, select: "-password" }
    );
    res.status(201).json(newUser);
  } catch (error) {
    next({
      message: "User update failed",
      error,
    });
  }
};

export const createNVRIUsers = async (req: any, res: any) => {
  try {
    for (const user of users) {
      await userModel
        .create({
          email: user?.email ?? "",
          userRole: ["user", "vet"],
          password: user?.password ?? "",
          phoneNumber: user?.phone ?? "",
          createdAt: user.date.$date,
          bizCategory: user.role,
        })
        .catch((error) => {
          console.log(error);
        });
    }
    await res.send("Saved");
  } catch (error) {
    console.log(error);
  }
};

const users = [
  {
    _id: {
      $oid: "5ea6699de3c64000170f6c46",
    },
    email: "bamanganjidda7@gmail.com",
    password: "$2a$10$ALFbvoWq8k67ELTt/vNyUeoxr2nbjBE3J1D6EmGnn5J9HZ9.pqTPC",
    avatar:
      "//www.gravatar.com/avatar/e15f4c8090b53acab16105716e930401?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348035936879",
    date: {
      $date: "2020-04-27T05:11:57.455Z",
    },
    full_name: "Odekhe Emmanuella Chiemella",
  },
  {
    _id: {
      $oid: "5ea669c1e3c64000170f6c47",
    },
    email: "lukasaji2020@gmail.com",
    password: "$2a$10$diglZxaM93SBceURlpCVXuuhy3RRqZDvfDUI7ygXquqz35eeJh5L.",
    avatar:
      "//www.gravatar.com/avatar/b55bf7c9861ec85e21d5cd4ed791e0b2?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348089817691",
    date: {
      $date: "2020-04-27T05:12:33.892Z",
    },
  },
  {
    _id: {
      $oid: "5ea669eae3c64000170f6c48",
    },
    email: "mishelbatari123@gmail.com",
    password: "$2a$10$DDVBv/2tsPew8GbNmvR9le3nw7zBL7iGLODvaDf1Mc860ahyv5lzW",
    avatar:
      "//www.gravatar.com/avatar/1764bf50449651bd9000706b8bd46c45?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2347031978488",
    date: {
      $date: "2020-04-27T05:13:14.209Z",
    },
  },
  {
    _id: {
      $oid: "5ea66a09e3c64000170f6c49",
    },
    email: "abdullahigarbadeba69@gmail.com",
    password: "$2a$10$LfkJfcD/5rAghnEN7DyYjeSERpy4Xbw5WElQYBPNAgff3LjglvhtK",
    avatar:
      "//www.gravatar.com/avatar/c36b6783059a48a0fd34375eee3f4c15?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348069633411",
    date: {
      $date: "2020-04-27T05:13:45.869Z",
    },
  },
  {
    _id: {
      $oid: "5ea66a27e3c64000170f6c4a",
    },
    email: "hammanjoday@gmail.com",
    password: "$2a$10$z0oT78ygUoN700mSSLUDN.i6NcNuo/.9wozavnuMpwudXlj24njcm",
    avatar:
      "//www.gravatar.com/avatar/724a756ceb35b1040691eb7b03506251?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348164373116",
    date: {
      $date: "2020-04-27T05:14:15.034Z",
    },
  },
  {
    _id: {
      $oid: "5ea66a48e3c64000170f6c4b",
    },
    email: "hamiduabubakar101@gmail.com",
    password: "$2a$10$gfkVMREBVsimqnv6u6a.TOplgMCo8t3dhyJc8SaL/xKyoo7EPCM2S",
    avatar:
      "//www.gravatar.com/avatar/1699b0fc068f0690724a32888ad28336?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348036528318",
    date: {
      $date: "2020-04-27T05:14:48.523Z",
    },
  },
  {
    _id: {
      $oid: "5ea66a60e3c64000170f6c4c",
    },
    email: "abubakarharmis1979@gmail.com",
    password: "$2a$10$UniUlp0XgCdpJlmKQALmn.2n2gygQ6vjA/41YK82G5rlwuxCsXXiy",
    avatar:
      "//www.gravatar.com/avatar/b69b2e649e0a9521d769fdc434b24944?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348060801346",
    date: {
      $date: "2020-04-27T05:15:12.176Z",
    },
  },
  {
    _id: {
      $oid: "5ea66a90e3c64000170f6c4d",
    },
    email: "abubakarsergentmamman@gmail.com",
    password: "$2a$10$mWtVZxVs484N4OW3iYaSzOO0eWD9XA6U0rxxXLFoYMaIBKVbHxPZq",
    avatar:
      "//www.gravatar.com/avatar/4ad5e80a7f6fb3c4ca96673e23042590?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348169953438",
    date: {
      $date: "2020-04-27T05:16:00.916Z",
    },
  },
  {
    _id: {
      $oid: "5ea66aa6e3c64000170f6c4e",
    },
    email: "bilya4130@gmail.com",
    password: "$2a$10$JSpmb8ohg1sfS114wTBBpOXdJOKArSlZ.33Gdbqm/Udf/kQ5UkTjS",
    avatar:
      "//www.gravatar.com/avatar/84ccb668a3d06e0a5e850e3b48918e57?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348035856720",
    date: {
      $date: "2020-04-27T05:16:22.217Z",
    },
  },
  {
    _id: {
      $oid: "5ea66ac7e3c64000170f6c4f",
    },
    email: "tosinadedayo78@gmail.com",
    password: "$2a$10$RvFyP5Cikb/YZguJN813YezWNgzSNJ2rGbyRDwIew.crM4SlQ3PLG",
    avatar:
      "//www.gravatar.com/avatar/20e841dafbdf4b90fdbe0f36bf7fa740?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348033829871",
    date: {
      $date: "2020-04-27T05:16:55.403Z",
    },
  },
  {
    _id: {
      $oid: "5ea66adfe3c64000170f6c50",
    },
    email: "musaabubakar4real@gmail.com",
    password: "$2a$10$Hr8Z4cwgF6VV7I64cQu0ZuXnO7K4lPPZihCQyQZTY2l2.2IWQD8MS",
    avatar:
      "//www.gravatar.com/avatar/613bfad1f2a5cf43fe5bcd0d47f162dd?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348065483599",
    date: {
      $date: "2020-04-27T05:17:19.661Z",
    },
  },
  {
    _id: {
      $oid: "5ea66afae3c64000170f6c51",
    },
    email: "markyerimaehi@gmail.com",
    password: "$2a$10$RBkiOlxE1akM3y9phdrx6.YZq33ukSkBn5Q4bZjzoABLpcZn52TvW",
    avatar:
      "//www.gravatar.com/avatar/4ae0bbd6d0c0db3e83b7ee38ae292c9d?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2347010535451",
    date: {
      $date: "2020-04-27T05:17:46.392Z",
    },
  },
  {
    _id: {
      $oid: "5ea66b15e3c64000170f6c52",
    },
    email: "hammatukurjibrilla@gmail.com",
    password: "$2a$10$cL46HEGdAdWZUZUfF01wjuFjuVi/6JTrphpmIT8gtC.1AIt7MqUYi",
    avatar:
      "//www.gravatar.com/avatar/70e35ae7c09e37e43cce0dd53c038862?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348025718895",
    date: {
      $date: "2020-04-27T05:18:13.250Z",
    },
  },
  {
    _id: {
      $oid: "5ea66b2ae3c64000170f6c53",
    },
    email: "sanihammanadama283@gmail.com",
    password: "$2a$10$MtxNppje3YzbSfKjPxo60uxq21aok5E2b2Xc8hzmhQW9HPvYxTnhW",
    avatar:
      "//www.gravatar.com/avatar/16ed32a66434b7dddcc5249f70fe2328?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348131667069",
    date: {
      $date: "2020-04-27T05:18:34.320Z",
    },
  },
  {
    _id: {
      $oid: "5ea66b42e3c64000170f6c54",
    },
    email: "ruthelisha06@gmail.com",
    password: "$2a$10$aEZpNtc0rjwQX.ciSxKCdeUFBeU1bpSO0y2RLzFyH28MIip.qU3bu",
    avatar:
      "//www.gravatar.com/avatar/37dd4d7e18788a51fec3dc44cf08a3df?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2347039879078",
    date: {
      $date: "2020-04-27T05:18:58.117Z",
    },
  },
  {
    _id: {
      $oid: "5ea66b56e3c64000170f6c55",
    },
    email: "abubakarlamidodk@gmail.com",
    password: "$2a$10$BRh3v4vGxkPNbv9oBpXCJOYV7eYxH/HyTgmG3sJjQE1RH5zv4ujAG",
    avatar:
      "//www.gravatar.com/avatar/c7197a03b398985631bd2499b12958f6?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2347069169433",
    date: {
      $date: "2020-04-27T05:19:18.235Z",
    },
  },
  {
    _id: {
      $oid: "5ea66b75e3c64000170f6c56",
    },
    email: "chubadoumar86@gmail.com",
    password: "$2a$10$2IXNyuuwD2CjUX0RI6BVkudPpdW6Fes3sOiIQlELM9mYEA1Hd/HiG",
    avatar:
      "//www.gravatar.com/avatar/7b7acf34a61fc84089a91f0791661dbf?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348161201756",
    date: {
      $date: "2020-04-27T05:19:49.887Z",
    },
  },
  {
    _id: {
      $oid: "5ea66b88e3c64000170f6c57",
    },
    email: "mahmudumar195@gmail.com",
    password: "$2a$10$CLtcG414MGxLMHpj7HT6RuuI8qjSABuVwazX6tqv/PhJXEuXAFPwy",
    avatar:
      "//www.gravatar.com/avatar/5005b8e1bedb78ae110f950e19f7e71a?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348038394387",
    date: {
      $date: "2020-04-27T05:20:08.178Z",
    },
  },
  {
    _id: {
      $oid: "5ea66b9ce3c64000170f6c58",
    },
    email: "tmmalle94@gmail.com",
    password: "$2a$10$Cx2xonNc1LWaVoZ.iy4iV./JdVLxe5k6E1P.CK3YSRtUX5WvPk75.",
    avatar:
      "//www.gravatar.com/avatar/c1668bedcc06071f6299eb05fbd61f91?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348031101690",
    date: {
      $date: "2020-04-27T05:20:28.281Z",
    },
  },
  {
    _id: {
      $oid: "5ea66bb6e3c64000170f6c59",
    },
    email: "julianaabdumaisamari@gmail.com",
    password: "$2a$10$JnitJeUbJxN6uDk9pgvnsODwdIVNZL41hqM7telUA5DVbsvuKreeq",
    avatar:
      "//www.gravatar.com/avatar/14f70f75bd2ecf220aabdfe8ae1e2e95?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348024376510",
    date: {
      $date: "2020-04-27T05:20:54.087Z",
    },
  },
  {
    _id: {
      $oid: "5ea66bcce3c64000170f6c5a",
    },
    email: "sebastinevince00@gmail.com",
    password: "$2a$10$bN909SqfAASVsmaiO2DjmuQFJervhwtoW8lRTH0RLdjXhZWooJnia",
    avatar:
      "//www.gravatar.com/avatar/b2fc8f0b6fd6b0ffb0db12729a4c6895?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2347065739555",
    date: {
      $date: "2020-04-27T05:21:16.203Z",
    },
  },
  {
    _id: {
      $oid: "5ea66be1e3c64000170f6c5b",
    },
    email: "mammanlawan8@gmail.com",
    password: "$2a$10$Sb3CWeiHgL9naJ1De.fLbunBwyS7HOHB52vgBrakveHnMthPTwmAS",
    avatar:
      "//www.gravatar.com/avatar/e98f6cd3c5744337a97cc8f5e1ed04f5?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2349020240185",
    date: {
      $date: "2020-04-27T05:21:37.091Z",
    },
  },
  {
    _id: {
      $oid: "5ea66bf6e3c64000170f6c5c",
    },
    email: "kwandodaniel3@gmail.com",
    password: "$2a$10$IycUBNcLKYP5YTaEw7byxeGmC0OrHtGBEw7IREi4/bAf83zuGG37C",
    avatar:
      "//www.gravatar.com/avatar/de6014bf93184642bd4cc166facb711c?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348062871112",
    date: {
      $date: "2020-04-27T05:21:58.290Z",
    },
  },
  {
    _id: {
      $oid: "5ea66c0fe3c64000170f6c5d",
    },
    email: "morrisonobidah@gmail.com",
    password: "$2a$10$d8JLySdHwXXDtmk8rTlDQ.KomYP2cYuVRYWslq4K4nPal.Ft1DQJy",
    avatar:
      "//www.gravatar.com/avatar/b592693019a1dbf74b4950946221bd31?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2347063222121",
    date: {
      $date: "2020-04-27T05:22:23.793Z",
    },
  },
  {
    _id: {
      $oid: "5ea66c2ce3c64000170f6c5e",
    },
    email: "bemohungi@gmail.com",
    password: "$2a$10$EjOf7h6MpntgIKmIWdKwyuAdTtc.PwVkA6jlxZzt.mXU2pXfaNdaq",
    avatar:
      "//www.gravatar.com/avatar/a85281a97a891806173bb3abff3651fa?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2347067674895",
    date: {
      $date: "2020-04-27T05:22:52.975Z",
    },
  },
  {
    _id: {
      $oid: "5ea66c3fe3c64000170f6c5f",
    },
    email: "abdullahiahmadu323@gmail.com",
    password: "$2a$10$NC829SN7qZnRB3HhTKqV1eNYdpFSRuMcrZSiMgeeY0NaZ.xGEAaYG",
    avatar:
      "//www.gravatar.com/avatar/53703c3df8e55dc189911ca59c67bd5f?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2347060582224",
    date: {
      $date: "2020-04-27T05:23:11.288Z",
    },
  },
  {
    _id: {
      $oid: "5ea66c53e3c64000170f6c60",
    },
    email: "gideonbenedict001@gmail.com",
    password: "$2a$10$znwULoa98utJsjV8CahdUO5oB9tF6h/KCPzxrgEcaRpcEI1MIkD1W",
    avatar:
      "//www.gravatar.com/avatar/9bbb356d750112988ed6ecc6e036c71e?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2347013849388",
    date: {
      $date: "2020-04-27T05:23:31.990Z",
    },
  },
  {
    _id: {
      $oid: "5ea66cc3e3c64000170f6c61",
    },
    email: "padicamacs@yahoo.com",
    password: "$2a$10$deM5TnUwERLB98gwRgJEKuHTPw2ZWEXx9Q.0Q.EcJqfAbHPBoh9Ie",
    avatar:
      "//www.gravatar.com/avatar/be4fd6c3868eeb8220757a46af3e2cdb?s=200&r=pg&d=mm",
    role: "admin",
    phone: "+2348136046515",
    date: {
      $date: "2020-04-27T05:25:23.114Z",
    },
  },
  {
    _id: {
      $oid: "5f29339b83f60f0017ce9773",
    },
    email: "hussainiisa83@gmail.com",
    password: "$2a$10$OS0oR0aW0ff14sHS3kHBwuzgcpng6rbosi8zV8Sr2fg72RVK4el6O",
    avatar:
      "//www.gravatar.com/avatar/a63bc2401e5d02d2d6881adc2127998e?s=200&r=pg&d=mm",
    role: "admin",
    phone: "08036057502",
    date: {
      $date: "2020-08-04T10:08:27.757Z",
    },
  },
  {
    _id: {
      $oid: "5f3fae9db0701a001782dc5d",
    },
    email: "mahmudbadamasi3@gmail.com",
    password: "$2a$10$6WC9SgAu6hktqZtOggp.F./Yjw6xwiysrK8XfSCZK5AbA/9MT6FjO",
    avatar:
      "//www.gravatar.com/avatar/f6349e9a4f72f33b0d3811c640c19c94?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "8064821799",
    date: {
      $date: "2020-08-21T11:23:09.080Z",
    },
  },
  {
    _id: {
      $oid: "5f3fb11ab0701a001782dc5e",
    },
    email: "abbanhaneeph001@gmail.com",
    password: "$2a$10$f5deDuZi0WA6I3WSm/kqSOZLbvnTho4fh7aI2/gkBsSyqJ3CdpBJa",
    avatar:
      "//www.gravatar.com/avatar/ca24c6e67327971b2e79903cacf38d07?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "7065403129",
    date: {
      $date: "2020-08-21T11:33:46.391Z",
    },
  },
  {
    _id: {
      $oid: "5f3fb520b0701a001782dc60",
    },
    email: "dlakwajunior1@gmail.com",
    password: "$2a$10$I9QobdJg9E1H4sEgFLK0r.N7f.3yG/zd7EmjBdaihqrQdB4vhdHfm",
    avatar:
      "//www.gravatar.com/avatar/f03f1f8bdbbd91abbae40fda4023784a?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "9030628844",
    date: {
      $date: "2020-08-21T11:50:56.298Z",
    },
  },
  {
    _id: {
      $oid: "5f3fba89b0701a001782dc61",
    },
    email: "talbatijjani880@gmail.com",
    password: "$2a$10$cTlVqDL22k93rEAye1cMQutYgzYjG/f6gVBA9izLKHkDl4FnhLdjm",
    avatar:
      "//www.gravatar.com/avatar/8352a3f85b589a401e92f3969f44241a?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "8020732674",
    date: {
      $date: "2020-08-21T12:14:01.644Z",
    },
  },
  {
    _id: {
      $oid: "5f3fbc12b0701a001782dc63",
    },
    email: "tukuribrahimdisina@gmail.com",
    password: "$2a$10$kgtS98n24C4bxZUKRSgsw.zb2sb0.mM8HifQdq04l6EpdiHM1H6Je",
    avatar:
      "//www.gravatar.com/avatar/23a349b6573f0d7b3085b808c1cedb9a?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "7032134808",
    date: {
      $date: "2020-08-21T12:20:34.118Z",
    },
  },
  {
    _id: {
      $oid: "5f7741de1e8fc100179c8ba9",
    },
    email: "mukam@farmnovation.com",
    password: "$2a$10$vCsfkzOR66FTbY/gRMlAPu14gU1q7a9f4qwjgqMCBLxgFFrWi1yM.",
    avatar:
      "//www.gravatar.com/avatar/9c77211a0a7e2acfe95dcb0b0f41343f?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "09062390504",
    date: {
      $date: "2020-10-02T15:06:06.084Z",
    },
  },
  {
    _id: {
      $oid: "5f786185b34ba900179b7076",
    },
    email: "binusman819@gmail.com",
    password: "$2a$10$5qTVCMP2EM.IdDVexm8yfOpakyAWFDgfiXey0n0eREa1Ozlqv9Jhi",
    avatar:
      "//www.gravatar.com/avatar/ff83b6593c2c62a4e230046c2a9d1651?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08066302843",
    date: {
      $date: "2020-10-03T11:33:25.457Z",
    },
  },
  {
    _id: {
      $oid: "5f78759b2abee80017bedf63",
    },
    email: "magajiyahaya06@gmail.com",
    password: "$2a$10$OQJ/OmicjFhIaQG8F/xekuJxglDdmzwkP26Qvpsz6GKtL9xQwUKJG",
    avatar:
      "//www.gravatar.com/avatar/ec16df824e9a056a65da2e440c7c7fd5?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08031380635",
    date: {
      $date: "2020-10-03T12:59:07.371Z",
    },
  },
  {
    _id: {
      $oid: "5f7887ecef68ad0017a44c29",
    },
    email: "sshuaibu500@gmail.com",
    password: "$2a$10$oPScBICEh/oafHWKO.2cse5jRC8PaR8OyXZ.N9cDheLfEfBdqKee6",
    avatar:
      "//www.gravatar.com/avatar/16cec1cfbd3697576b0f9e593573bf1f?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "07037390363",
    date: {
      $date: "2020-10-03T14:17:16.176Z",
    },
  },
  {
    _id: {
      $oid: "5f7903cce03a820017598859",
    },
    email: "aminuzubairu640@gmail.com",
    password: "$2a$10$JVh4XpPo30mHN45E7ESajOfI0nQisvH9W2mXtNVRdSOiH1QBs/JEy",
    avatar:
      "//www.gravatar.com/avatar/3a16bb68dd19664635ba7e1dfdbd3a0c?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "07060522215",
    date: {
      $date: "2020-10-03T23:05:48.437Z",
    },
  },
  {
    _id: {
      $oid: "5f7915f99d2b5d00172932b9",
    },
    email: "murtalampy@gmail.com",
    password: "$2a$10$orlF4MG2ZuGDyRDxAzp7rOvN6v3C0zrY.qQONXJYovdw3z7Cvhc2O",
    avatar:
      "//www.gravatar.com/avatar/6a0d550340c9fedf5de6525d45b814c9?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "09066024246",
    date: {
      $date: "2020-10-04T00:23:21.110Z",
    },
  },
  {
    _id: {
      $oid: "5f79dca55ff04900174c1c3e",
    },
    email: "mubarakisyaku@gmail.com",
    password: "$2a$10$Y2VdkFZByHlkCmRQudRkbOR21SS41A39qk9ilg0l7iDM60Pgpm0Y6",
    avatar:
      "//www.gravatar.com/avatar/19fe27b660190af43311a978d12a7bbc?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08066813421",
    date: {
      $date: "2020-10-04T14:31:01.988Z",
    },
  },
  {
    _id: {
      $oid: "5f84a00efa6b7500171e8b88",
    },
    email: "shamsuisashehu@gmail.com",
    password: "$2a$10$4/1f5UIlcyKSSi5lMzD9kumYgBZTpk5pBBZShdaaFI5KEEmez0tiC",
    avatar:
      "//www.gravatar.com/avatar/9aa5e41b627683868c50c2c185045a98?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08068214227",
    date: {
      $date: "2020-10-12T18:27:26.970Z",
    },
  },
  {
    _id: {
      $oid: "5f86ecd38ac08a0017fe917e",
    },
    email: "harbless@yahoo.com",
    password: "$2a$10$d6sIsdnFHQfBfnWeOrv4mOw/vTIJtQ.lG/xCgB5GPLI1LrYCT4U5G",
    avatar:
      "//www.gravatar.com/avatar/218ddbf3cb4ee19585980ca0295c5a1c?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08037508025",
    date: {
      $date: "2020-10-14T12:19:31.495Z",
    },
  },
  {
    _id: {
      $oid: "5f86fe4f96a7d2001755ad66",
    },
    email: "makvet2006@yahoo.com",
    password: "$2a$10$WM.cC6F/6B4QRssvwCbvXuIItmRaaIgbXiYeWg1Uibuk.b87/LX3W",
    avatar:
      "//www.gravatar.com/avatar/3a71dfed082fefc08718253aca38fc15?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08039731300",
    date: {
      $date: "2020-10-14T13:34:07.253Z",
    },
  },
  {
    _id: {
      $oid: "5f89288c3c7b5f0017418be9",
    },
    email: "docmsabuwa@gmail.com",
    password: "$2a$10$WH8QWSsD58rMUwCXjx0Qwuq7YDE94DxE660QUarsfUN/xQzwvBoFC",
    avatar:
      "//www.gravatar.com/avatar/c32f4beb6ec42a38cb6e5dfa3ea8dfca?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08039370285",
    date: {
      $date: "2020-10-16T04:58:52.386Z",
    },
  },
  {
    _id: {
      $oid: "5f8df9a977ef1d001795e464",
    },
    email: "sastwd5@gmail.com",
    password: "$2a$10$YIpiOB4HyxYhNdkKHGCHKuOi3b.vUpxXsbL8EbgZ2uskbu75Zbtva",
    avatar:
      "//www.gravatar.com/avatar/40276f3fb6bb1b30ecfe4633953644f7?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08062232274",
    date: {
      $date: "2020-10-19T20:40:09.437Z",
    },
  },
  {
    _id: {
      $oid: "5f8dfd2177ef1d001795e465",
    },
    email: "chinwe.a@farmnovation.com",
    password: "$2a$10$cx.a30EO0j1jTVitVFLHTuYB/cemdUKst3a7h6Tg5G1b16iOwOO/y",
    avatar:
      "//www.gravatar.com/avatar/347edac379dd110ac5ad23ce3789aaeb?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08139464949",
    date: {
      $date: "2020-10-19T20:54:57.011Z",
    },
  },
  {
    _id: {
      $oid: "5f9805c8df8de3001775ed97",
    },
    email: "aminuibrahimus@gmail.com",
    password: "$2a$10$HHE5I1oBtCvY9X/e4xACreDzIH0uGvES9QB.PFTihtrbRmE8d0Dcq",
    avatar:
      "//www.gravatar.com/avatar/1a30085107f5f088bc4b9b60db8caeef?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08065451988",
    date: {
      $date: "2020-10-27T11:34:32.382Z",
    },
  },
  {
    _id: {
      $oid: "5f9812e5df8de3001775eda4",
    },
    email: "abuwa836@gmail.com",
    password: "$2a$10$Ool6dCk3a1nvODbMr.GaluYxaAqyaBh7Cju1BCxD/pfctG/lXPp5a",
    avatar:
      "//www.gravatar.com/avatar/52cdd29f16b8bd78cf50f3484c117e6f?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "07065532865",
    date: {
      $date: "2020-10-27T12:30:29.799Z",
    },
  },
  {
    _id: {
      $oid: "5f981680df8de3001775eda6",
    },
    email: "yusufshamaki74@gmail.com",
    password: "$2a$10$auz.LvGnIC3sBdg1WA5tzuI3pycTaC/UPlM/B3XasTGAJnAi3lln6",
    avatar:
      "//www.gravatar.com/avatar/a8f54764d3b4d4ae2dc1712034a41598?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "07030070233",
    date: {
      $date: "2020-10-27T12:45:52.259Z",
    },
  },
  {
    _id: {
      $oid: "5f9827c1df8de3001775edbb",
    },
    email: "lawanganye89@gmail.com",
    password: "$2a$10$WgjDLdWMj.NfQ1JMxcdb7eBO73L1ilS1EkMN1.8Ig6P5HAD8YQwD.",
    avatar:
      "//www.gravatar.com/avatar/10cc7da360688784a02c92f6b4b2720d?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08087776979",
    date: {
      $date: "2020-10-27T13:59:29.869Z",
    },
  },
  {
    _id: {
      $oid: "5f982a6edf8de3001775edbc",
    },
    email: "polycarpmadaki@gmail.com",
    password: "$2a$10$8qCdjF9yF42LeFSJz1.zROC.XrR/f6H6KjSl/E/lrnhTRl0cA4l5i",
    avatar:
      "//www.gravatar.com/avatar/4c355627f7fd71f62cb3529e05322b44?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08065303749",
    date: {
      $date: "2020-10-27T14:10:54.448Z",
    },
  },
  {
    _id: {
      $oid: "5f982c8adf8de3001775edbd",
    },
    email: "bahmedopeyemi@yahoo.com",
    password: "$2a$10$QICsiaSLHiS7D/qXR.hI4e597dkDIF8GF5c.i41QwLqpL2L8IAXFO",
    avatar:
      "//www.gravatar.com/avatar/aa44336697e773c1a1125db7705a0128?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08073339411",
    date: {
      $date: "2020-10-27T14:19:54.552Z",
    },
  },
  {
    _id: {
      $oid: "5f983bde7e2d0600170e5591",
    },
    email: "nasirubsalihu@gmail.com",
    password: "$2a$10$Yu7HycaZkeHj4leKGioAeOGaBxp88ipWmv2S3fr5sVl5Xis9KvXjq",
    avatar:
      "//www.gravatar.com/avatar/ddc2fefd5bf4f9c9bad9d431344b09ef?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08065199566",
    date: {
      $date: "2020-10-27T15:25:18.387Z",
    },
  },
  {
    _id: {
      $oid: "5f984f26d33e2b001782df70",
    },
    email: "shehumahmudfufore@gmail.com",
    password: "$2a$10$GyLW6.loOkw2K3Z8QyYDT.mCW3csXJbtQaTYbPAUAeZoGHdYoez2m",
    avatar:
      "//www.gravatar.com/avatar/99a9f601691f4520989e15b722983201?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08138319668",
    date: {
      $date: "2020-10-27T16:47:34.605Z",
    },
  },
  {
    _id: {
      $oid: "5f986327f7ffff0017a317d6",
    },
    email: "bjjenchat@yahoo.com",
    password: "$2a$10$cS5GU6wcs1/CFO5qbVNfg.qdP3qb7T4Wa4j4IeDJeYpx9k0e/AFnO",
    avatar:
      "//www.gravatar.com/avatar/9aeb77fc0bb54ec5a045b746a2b250ee?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "07035950700",
    date: {
      $date: "2020-10-27T18:12:55.089Z",
    },
  },
  {
    _id: {
      $oid: "5f9863bef7ffff0017a317d7",
    },
    email: "garbaidris112@gmail.com",
    password: "$2a$10$siABwR7Qx3QnOqG7kTi5ue7UtfX/xioh07n.HgYf7bqhS0Wz1D/c6",
    avatar:
      "//www.gravatar.com/avatar/6553705f9831a5c340c2885654778882?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08038836030",
    date: {
      $date: "2020-10-27T18:15:26.165Z",
    },
  },
  {
    _id: {
      $oid: "5f9869d5f7ffff0017a317d8",
    },
    email: "informwilliams@gmail.com",
    password: "$2a$10$vKG.Y1lRbZfBfupYZUfjl.3vmNasr9Ggbme9K0Visuysm./vDV7MO",
    avatar:
      "//www.gravatar.com/avatar/5733931d70e784bd0e00790790e68563?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08164102608",
    date: {
      $date: "2020-10-27T18:41:25.455Z",
    },
  },
  {
    _id: {
      $oid: "5f991b3894abf70017265922",
    },
    email: "maiyangadj@gmail.com",
    password: "$2a$10$nPpTPPJUzlOrRR5Kc5iZ9.Kl4tLKYPXf2pw88g78959o5xBqs9CZq",
    avatar:
      "//www.gravatar.com/avatar/876db77157fbdecb12147a3634e2c04f?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08136203091",
    date: {
      $date: "2020-10-28T07:18:16.144Z",
    },
  },
  {
    _id: {
      $oid: "5f99a708fa943c001749c130",
    },
    email: "danladijoel50@gmail.com",
    password: "$2a$10$Eedz1FYqsyLgHhjUilS7KOg5MD9yeSKw03TVt3YfV1OA5oPM2ybYq",
    avatar:
      "//www.gravatar.com/avatar/520beeca4babc0533fbb5bfb90554a3d?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08181954448",
    date: {
      $date: "2020-10-28T17:14:48.166Z",
    },
  },
  {
    _id: {
      $oid: "5f9dbb74ff9dc30017b83c86",
    },
    email: "okinhafsat@gmail.com",
    password: "$2a$10$0y8mBUTmZOSqJZ5fZSHMvemmcqyhpCRpi.PxR6MR/Y8z2QjZzQofW",
    avatar:
      "//www.gravatar.com/avatar/8582a291901233d696ed5b5b809e07d3?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08066366984",
    date: {
      $date: "2020-10-31T19:31:00.588Z",
    },
  },
  {
    _id: {
      $oid: "5f9e4223701e09001765c701",
    },
    email: "abubakardaya307@gmail.com",
    password: "$2a$10$bTw4E4iebjoa/A5wkLOecexhKq.thZS8KFlb9ZZkjvRRubXYG67HG",
    avatar:
      "//www.gravatar.com/avatar/e1b4a5c2280afb14152a72536c628e9f?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08032879177",
    date: {
      $date: "2020-11-01T05:05:39.642Z",
    },
  },
  {
    _id: {
      $oid: "5f9ffebd1ae983001773751f",
    },
    email: "danlamiabdu8@gmail.com",
    password: "$2a$10$mNcKT.eQ9jY7L1VBiM1iV.v1goWqPD32s3FZnvgEX8A8bKDNC2ZdC",
    avatar:
      "//www.gravatar.com/avatar/5f586366ee5306f5f53fe36fcdcc4c1d?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08058646271",
    date: {
      $date: "2020-11-02T12:42:37.123Z",
    },
  },
  {
    _id: {
      $oid: "5fa000d21ae9830017737520",
    },
    email: "jerry@jaypeg.design",
    password: "$2a$10$dzZl.P/Bm0EJCZ3/CU04EeCkCEVU3YpZtjbkjcyvDSrV0T4z24X4.",
    avatar:
      "//www.gravatar.com/avatar/1add8c8719ebcc3eab9f930f07810d2a?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08055809147",
    date: {
      $date: "2020-11-02T12:51:30.299Z",
    },
  },
  {
    _id: {
      $oid: "5fa177ea8235450017e8d1b3",
    },
    email: "melchmos@gmail.com",
    password: "$2a$10$3FRPyvYjZugNSzB/bi8dVuz2zqM7LYyNlS3FPchLlycWDxUuv8o5e",
    avatar:
      "//www.gravatar.com/avatar/de283df35663e7957fa86c68f0f92814?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "08061574937",
    date: {
      $date: "2020-11-03T15:31:54.639Z",
    },
  },
  {
    _id: {
      $oid: "5fa22eb676bcae00179c1ccc",
    },
    email: "andy.ogaga@gmail.com",
    password: "$2a$10$BiZ/MiNqIkIHdhS3k.DonOjcRXgYbORLF2lIeDtBDxFmnwv1UVh3C",
    avatar:
      "//www.gravatar.com/avatar/6552c0f2e947d01ec5c82cf66401e1b3?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2347030894101",
    date: {
      $date: "2020-11-04T04:31:50.252Z",
    },
  },
  {
    _id: {
      $oid: "5fa410d12d9a0700170c50fc",
    },
    email: "saniabdulazeez05@gmail.com",
    password: "$2a$10$m7zA2ZNWlF76v0ZjsON1quKlxnWDs//k0J6zt9yh7N8dkoWAMrcwu",
    avatar:
      "//www.gravatar.com/avatar/d8c99f32a856d5a5655744f16513b287?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348039769105",
    date: {
      $date: "2020-11-05T14:48:49.832Z",
    },
  },
  {
    _id: {
      $oid: "5fa418ab2d9a0700170c50ff",
    },
    email: "talatuvet@gmail.com",
    password: "$2a$10$xZtOUpXfrf4XbqtA9v/QieZ5U3xtMs1skeGPxP7vWuENeIHhS0icm",
    avatar:
      "//www.gravatar.com/avatar/84e8e6f9021b639c14ee6bc83cd6a77d?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348068432478",
    date: {
      $date: "2020-11-05T15:22:19.999Z",
    },
  },
  {
    _id: {
      $oid: "5fa81ba50190b70017798b17",
    },
    email: "ngirops3898@gmail.com",
    password: "$2a$10$0zI7grXemUTi7XvOM2w8i.KetKFiT0XYILncFvcISq9zCTWREHJNe",
    avatar:
      "//www.gravatar.com/avatar/f475949d35f8b63689154c492a86db47?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+23407034724359",
    date: {
      $date: "2020-11-08T16:24:05.021Z",
    },
  },
  {
    _id: {
      $oid: "5fa9941ad04b5e00170771bd",
    },
    email: "kolomakinta@yahoo.com",
    password: "$2a$10$vm6osQTuSyLpGNI7bNfoIOhv5k.94RqNXEkIxHDB3sqUGrsqb0REG",
    avatar:
      "//www.gravatar.com/avatar/59bd7c52e37998e41c3a0f7afaeb6d00?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2347031201670",
    date: {
      $date: "2020-11-09T19:10:18.533Z",
    },
  },
  {
    _id: {
      $oid: "5faa9d8de8ff630017c79bcb",
    },
    email: "musajanyekelle@gmal.com",
    password: "$2a$10$JjwVYzrCzmjhkwSRv5bSoebrcynJqpMjXvMiYPYKGTm1k4/b1fuVe",
    avatar:
      "//www.gravatar.com/avatar/d0dc07d457599d35c7ea4e9dc06bfba4?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+234060560095",
    date: {
      $date: "2020-11-10T14:02:53.882Z",
    },
  },
  {
    _id: {
      $oid: "5fab03090190ea0017cae47e",
    },
    email: "mihadejia38@gmail.com",
    password: "$2a$10$RqXrtumiTdQb1RCiOuJ1EeMBFNUMXJTaRNFu9xZ1nM7v1TEBE3UE2",
    avatar:
      "//www.gravatar.com/avatar/4787a21af116a528dc1983391b3c95d6?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348032390510",
    date: {
      $date: "2020-11-10T21:15:53.833Z",
    },
  },
  {
    _id: {
      $oid: "5fad4f97a74b670017629024",
    },
    email: "davidsadeiza@gmail.com",
    password: "$2a$10$SatEESke5WCCQZD9i95XHu9nWlzbytdH2Wd4btbM4cY7mcSK.n.4a",
    avatar:
      "//www.gravatar.com/avatar/bc828ea41d3a6c35e06f97def36271fc?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348032771741",
    date: {
      $date: "2020-11-12T15:07:03.423Z",
    },
  },
  {
    _id: {
      $oid: "5fb4db9dc3b01800171ad6b0",
    },
    email: "iamshleeq@gmail.com",
    password: "$2a$10$SnK4i.RLy6w0Xujd2eIZi.BtIOiaqTULq/3sTHs1He4ASZ1PktVN6",
    avatar:
      "//www.gravatar.com/avatar/1b5aa063cb707ad75de41af9cb878bfd?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2347030894179",
    date: {
      $date: "2020-11-18T08:30:21.867Z",
    },
  },
  {
    _id: {
      $oid: "5fb4e9b83cd7f3001715d9fc",
    },
    email: "salabad368@gmail.com",
    password: "$2a$10$dzhVK6ZVQ9GGRQvt6DG5a.ZEHOSCZQObddHARU/kx46C2XzdLyoTG",
    avatar:
      "//www.gravatar.com/avatar/d69065b11fb64b1e3886ecd4573683cc?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348034505258",
    date: {
      $date: "2020-11-18T09:30:32.642Z",
    },
  },
  {
    _id: {
      $oid: "5fb4eac63cd7f3001715d9fd",
    },
    email: "babassamuel6@gmail.com",
    password: "$2a$10$v3afpokGbbxXA3VPrQp9fubGO56k4k8LhKNkyTka6oFO/.iV87IDO",
    avatar:
      "//www.gravatar.com/avatar/04255abf15a0c3e7021f9967ab32b61e?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348069296302",
    date: {
      $date: "2020-11-18T09:35:02.630Z",
    },
  },
  {
    _id: {
      $oid: "5fb5162994d3070017b0b3d3",
    },
    email: "dorokbar@gmail.com",
    password: "$2a$10$JOI.XsvB582.Q4qmud2QyuKsbULfb/Z2/rVgmVCW5uzc3IEzBoCCm",
    avatar:
      "//www.gravatar.com/avatar/b8f87db2434f0b45a07bd6987f46fb8c?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348036677487",
    date: {
      $date: "2020-11-18T12:40:09.164Z",
    },
  },
  {
    _id: {
      $oid: "5fb5185a94d3070017b0b3d4",
    },
    email: "jacobsule20@gmail.com",
    password: "$2a$10$MtT1EUEfuvzL1knhicv2bOW0/tQWH9SY7wBaH93Qc7E.RNuWA28e6",
    avatar:
      "//www.gravatar.com/avatar/38d05fe104567d9b9833b8589a30cb74?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2347035170906",
    date: {
      $date: "2020-11-18T12:49:30.106Z",
    },
  },
  {
    _id: {
      $oid: "5fb679620688c90017ec3c67",
    },
    email: "erenaabdul72@gmail.com",
    password: "$2a$10$Kqxs8haZr0KKJvYnirmtdujIJJkLsO5cCKnf7ohCd5ZxsEHsXXctm",
    avatar:
      "//www.gravatar.com/avatar/a2a49bd196a1d2805a2977da29effb78?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348130239993",
    date: {
      $date: "2020-11-19T13:55:46.932Z",
    },
  },
  {
    _id: {
      $oid: "5fb67c180688c90017ec3c68",
    },
    email: "dasyahaya123@gmail.com",
    password: "$2a$10$ZiA.IkJ4BbN2aUrwNWKmze4IwLH9rFNs2agvC8n10dVzC4lOX8lHW",
    avatar:
      "//www.gravatar.com/avatar/da143be858d63c39f8d1bc46ccc7e3ef?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348032065991",
    date: {
      $date: "2020-11-19T14:07:20.884Z",
    },
  },
  {
    _id: {
      $oid: "5fb67c2d0688c90017ec3c69",
    },
    email: "yensum75@gmail.com",
    password: "$2a$10$1KWcd6NYt7ywT8U/n9TJceOxJLj8iUumg/iOj0hxy/BMa9s.GqX.W",
    avatar:
      "//www.gravatar.com/avatar/32c10e6904414433e6a78287bb729b9b?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348184747774",
    date: {
      $date: "2020-11-19T14:07:41.317Z",
    },
  },
  {
    _id: {
      $oid: "5fb67ca10688c90017ec3c6a",
    },
    email: "johnfatoki12@gmail.com",
    password: "$2a$10$uqWe.tt11yoPNUvuFiuItem6BQNtxhJ4migTXZugUOKTt4SJbQrZO",
    avatar:
      "//www.gravatar.com/avatar/1b0933be7691ec1b35ccd10bb5c4afb7?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+23408130592829",
    date: {
      $date: "2020-11-19T14:09:37.369Z",
    },
  },
  {
    _id: {
      $oid: "5fb67cc70688c90017ec3c6b",
    },
    email: "rabiatusman999@gmail.com",
    password: "$2a$10$jgEob3/vMPBLHxRdZ0NYdOlidaqsQSuG12PoYt7oyww/vqLKt18Ru",
    avatar:
      "//www.gravatar.com/avatar/5770340c67aa9706594d2785dcb1cafe?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348035931351",
    date: {
      $date: "2020-11-19T14:10:15.742Z",
    },
  },
  {
    _id: {
      $oid: "5fb67d030688c90017ec3c6f",
    },
    email: "ombugukuje@gmail.com",
    password: "$2a$10$AlwhShLNXeByHjpIKnOj3.fl3HADt6AHhDdVdp2uBfMlVaes.FAT2",
    avatar:
      "//www.gravatar.com/avatar/f2c11314962064443e95a2172dcb18a3?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348039138104",
    date: {
      $date: "2020-11-19T14:11:15.636Z",
    },
  },
  {
    _id: {
      $oid: "5fb67d3d0688c90017ec3c70",
    },
    email: "nwezepatricia@gmail.com",
    password: "$2a$10$oq3utjKiZPXVTa3PDFZzWe5QL3VPQfeZz5DMqkwiZJUBxJPzW4jAa",
    avatar:
      "//www.gravatar.com/avatar/3925a00b1e1c079263355396a782a905?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+23409048508033",
    date: {
      $date: "2020-11-19T14:12:13.752Z",
    },
  },
  {
    _id: {
      $oid: "5fb67d420688c90017ec3c71",
    },
    email: "frankogbenyi@gmail.com",
    password: "$2a$10$kBIibpSKeFZfOXUyAyW9y.85vvEi5cXabi/tlBbQGbHAYLh478NuG",
    avatar:
      "//www.gravatar.com/avatar/db185625512494e2479fb3ed79843538?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348035955506",
    date: {
      $date: "2020-11-19T14:12:18.444Z",
    },
  },
  {
    _id: {
      $oid: "5fb67d700688c90017ec3c72",
    },
    email: "akunnia@yahoo.com",
    password: "$2a$10$JhRM2wAjXTM95v46wtAjRecabDO/mv.NbWV/33fKvTfhNAfKclKE6",
    avatar:
      "//www.gravatar.com/avatar/01b3ba9c98be4e90ad813185fe337f2d?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348033106135",
    date: {
      $date: "2020-11-19T14:13:04.756Z",
    },
  },
  {
    _id: {
      $oid: "5fb67d900688c90017ec3c73",
    },
    email: "osumicreal@yahoo.com",
    password: "$2a$10$XdgfFjjrnC1AzR/3LzOlGOFGGCSLsZB2RuPr7sHyWTR0R9iGpZwGG",
    avatar:
      "//www.gravatar.com/avatar/fe2192c8ffcbb9df8a17bbcfc917bb5e?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348037965641",
    date: {
      $date: "2020-11-19T14:13:36.427Z",
    },
  },
  {
    _id: {
      $oid: "5fb67da30688c90017ec3c74",
    },
    email: "tundebamidele.bd@gmail.com",
    password: "$2a$10$biizC56b4DdRQGzcgQkPoOHORFYXjcZjhQoO3b87FH6mDHmnrgDYW",
    avatar:
      "//www.gravatar.com/avatar/4a22b6de257be2c7420ccb92e187bfec?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348089901750",
    date: {
      $date: "2020-11-19T14:13:55.300Z",
    },
  },
  {
    _id: {
      $oid: "5fb67da90688c90017ec3c75",
    },
    email: "ukatukasie4@gmail.com",
    password: "$2a$10$Gp3JBvfZw2TfSr1afbww0O9Gl5EupojlwxO30bGvl5MEluK.YQJD6",
    avatar:
      "//www.gravatar.com/avatar/f28246550e479a4b06c02f2960db5d58?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+23408033646040",
    date: {
      $date: "2020-11-19T14:14:01.779Z",
    },
  },
  {
    _id: {
      $oid: "5fb67daa0688c90017ec3c76",
    },
    email: "oladipoadeoye22@gmail.com",
    password: "$2a$10$ngGcxQmwxutYDqMqzkfmYOaJUJOqjoylmSx84O2m1tFctM4I1Ltvi",
    avatar:
      "//www.gravatar.com/avatar/72829111b90b870955833691e312b74f?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348067455686",
    date: {
      $date: "2020-11-19T14:14:02.629Z",
    },
  },
  {
    _id: {
      $oid: "5fb67dc80688c90017ec3c77",
    },
    email: "lamidomuhammad253@gmail.com",
    password: "$2a$10$3Z5wFVqyfjz5xL3w/oV7rOdFm6xvEyOg.BieCOnZ8tFa0USQXrzx2",
    avatar:
      "//www.gravatar.com/avatar/8af36b758e6b94a244544c6a1ecea303?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+23408025711253",
    date: {
      $date: "2020-11-19T14:14:32.787Z",
    },
  },
  {
    _id: {
      $oid: "5fb67dd20688c90017ec3c78",
    },
    email: "kantiokjerry324@gmail.com",
    password: "$2a$10$dvdDrRZPyf91K2dA21Wa3eGHdWT9/gFEz.C/IzdwQqSXg4VMkJ1cW",
    avatar:
      "//www.gravatar.com/avatar/8b3d3d4ecdf9a4b59bf418ba9a3a751a?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2349068002121",
    date: {
      $date: "2020-11-19T14:14:42.304Z",
    },
  },
  {
    _id: {
      $oid: "5fb67e930688c90017ec3c7c",
    },
    email: "luckyikukaiwe@yahoo.com",
    password: "$2a$10$XLxCeAR3Me39dARA1obqCeLw9ok6Jk8mKe9KsRwrmfEJ0YaYHNbgW",
    avatar:
      "//www.gravatar.com/avatar/bc6d4f86302342c859a508f7f5721529?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348033440547",
    date: {
      $date: "2020-11-19T14:17:55.888Z",
    },
  },
  {
    _id: {
      $oid: "5fb680040688c90017ec3c7f",
    },
    email: "alamurinolufemi1958@gmail.com",
    password: "$2a$10$sFEIJjAEBfWN9ondSEF7.OTcs2StnUi5VlLEA/a.hj.R0mjUY6W2S",
    avatar:
      "//www.gravatar.com/avatar/44c8fc41da09dedc68ac869e3189d628?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348038570731",
    date: {
      $date: "2020-11-19T14:24:04.705Z",
    },
  },
  {
    _id: {
      $oid: "5fb6800d0688c90017ec3c80",
    },
    email: "missiongatefarms7@gmail.com",
    password: "$2a$10$6FZEP3cIswzwmrY0AmkGGe8InIuPt.Kh25NZmBeDqmkzkDXSzD03K",
    avatar:
      "//www.gravatar.com/avatar/b2bf2e46193bc32eaecc0760fa0e3319?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+23408037617661",
    date: {
      $date: "2020-11-19T14:24:13.275Z",
    },
  },
  {
    _id: {
      $oid: "5fb680d50688c90017ec3c81",
    },
    email: "adobuba07037@gmail.com",
    password: "$2a$10$RZHkUEy.rGYf51pS9VoXOOWuyIHfLNvMlzD/OMu8EWtlr3ZTusXEi",
    avatar:
      "//www.gravatar.com/avatar/b178136b1b1dbcc1ecd41337d06d1297?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+234703621666",
    date: {
      $date: "2020-11-19T14:27:33.055Z",
    },
  },
  {
    _id: {
      $oid: "5fb681110688c90017ec3c82",
    },
    email: "bifems2003@gmail.com",
    password: "$2a$10$bmw4a6S7qOSNLNooUy3B8.csOkb8FKYw97odPTPZQIn3E9TLlc3Aa",
    avatar:
      "//www.gravatar.com/avatar/6b25193005f6d7b957800d87c6a9b28d?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2438055356187",
    date: {
      $date: "2020-11-19T14:28:33.608Z",
    },
  },
  {
    _id: {
      $oid: "5fb681400688c90017ec3c83",
    },
    email: "musasani409@gmail.com",
    password: "$2a$10$ZepbjbT6/is0HJOD5OcZWeNkv/ib68hZuyPJR0HlaElKDwck2ZzYu",
    avatar:
      "//www.gravatar.com/avatar/fb5799a245c8cd05f2c0c74b71d7feaa?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348081129846",
    date: {
      $date: "2020-11-19T14:29:20.606Z",
    },
  },
  {
    _id: {
      $oid: "5fb682280688c90017ec3c84",
    },
    email: "yyauladan@gmail.com",
    password: "$2a$10$ofGgUZyu7FD09OApYaHnceQOnYWAwi2HiWB.MzvDtEuQrQxWTjLIm",
    avatar:
      "//www.gravatar.com/avatar/7c62ca58c5c16a820d8f0dd86b362a8d?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348036371163",
    date: {
      $date: "2020-11-19T14:33:12.794Z",
    },
  },
  {
    _id: {
      $oid: "5fb68c3e0688c90017ec3c8a",
    },
    email: "eribahsamuel@gmail.com",
    password: "$2a$10$B53KWa1b6cP/yHXMlvw9HuiZggw7ZQIjSoupCc4EIU7k1BaH68vk6",
    avatar:
      "//www.gravatar.com/avatar/a39db7d3c52e7cd9ce58968042a629c9?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348096157744",
    date: {
      $date: "2020-11-19T15:16:14.464Z",
    },
  },
  {
    _id: {
      $oid: "5fb68eb70688c90017ec3c8c",
    },
    email: "ibiangiboh12@gmail.com",
    password: "$2a$10$Z34NF9ghOY8qCWX8JEQPf..lFem8YJ/UvHHsKnh4jQD/qVJLtyQeC",
    avatar:
      "//www.gravatar.com/avatar/e0139439b48281d0809f45c59295ace2?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348064909506",
    date: {
      $date: "2020-11-19T15:26:47.641Z",
    },
  },
  {
    _id: {
      $oid: "5fb73d447f5b390017e14a43",
    },
    email: "myabdulhamid@gmail.com",
    password: "$2a$10$Xc8NMQRwqHFt2zckINwuQOP3Wy4JJAUEC6g6CU/aasWUyzibulI5u",
    avatar:
      "//www.gravatar.com/avatar/183fac2b2ff1472bca81fde25c99f86f?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348038214149",
    date: {
      $date: "2020-11-20T03:51:32.234Z",
    },
  },
  {
    _id: {
      $oid: "5fb7523f7f5b390017e14a4b",
    },
    email: "movianvet@gmail.com",
    password: "$2a$10$hE0xfV0F4h3K6dyIebcr0e2xnNNvhr6BG6qd3NbOh5yMn.G/GMeYW",
    avatar:
      "//www.gravatar.com/avatar/a10cc335cce3e0a0dbd2fcd17eb27ecd?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348038780946",
    date: {
      $date: "2020-11-20T05:21:03.905Z",
    },
  },
  {
    _id: {
      $oid: "5fb92616a37ec60017de45e4",
    },
    email: "vetdelacreme@gmail.com",
    password: "$2a$10$UdCPnWElphBgMrZvYCEokucbZ9mRxU13y0.GYRVn20WRquhaFeAby",
    avatar:
      "//www.gravatar.com/avatar/76f9848524619fc7f457311aaddaeb08?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348036317920",
    date: {
      $date: "2020-11-21T14:37:10.332Z",
    },
  },
  {
    _id: {
      $oid: "5fba3be973641e00173b741a",
    },
    email: "nanrebitrus@gmail.com",
    password: "$2a$10$qUbtf87KEIVWB5FCnRE8tu7th3/WECXmD4EkvBCTW4hg8WOPNTtFa",
    avatar:
      "//www.gravatar.com/avatar/2ed223cb6d70d0e1e9001480c64ea253?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+2348115444608",
    date: {
      $date: "2020-11-22T10:22:33.453Z",
    },
  },
  {
    _id: {
      $oid: "5fbc42086dbe650017291b9a",
    },
    email: "adeyanjuoluwarotimi@gmail.com",
    password: "$2a$10$NIQ9GuwUL0gcVgUIkjlr3O.JuSvwJuv1F/e8/VU.FuP9P3CoYZ2Ze",
    avatar:
      "//www.gravatar.com/avatar/ef0db05dc16799289d28cfc4412fc247?s=200&r=pg&d=mm",
    role: "cahw",
    phone: "+08138137922",
    date: {
      $date: "2020-11-23T23:13:12.332Z",
    },
  },
];
