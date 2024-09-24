import prisma from "../utils/PrismaClient";

async function isUserExists(username){

   const userCount= await prisma.user.count({
        where:{
            username:username
        }
    })
    return userCount>0;
}

export {isUserExists}