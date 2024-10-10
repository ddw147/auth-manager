import prisma from "../src/utils/PrismaClient";


async function main() {
    const manageUserRole =  await prisma.role.create({
        data:{
            name:'manage-user-roles',
        }
    })

    const addRoleToUserPermission = await prisma.permission.create({
        data:{
            name:'add-role-to-user',
            roles:{
                connect:{
                    id:manageUserRole.id
                }
            }
        }
    })

    const reomveRoleFromUserPermission = await prisma.permission.create({
        data:{
            name:'remove-role-from-user',
            roles:{
                connect:{
                    id:manageUserRole.id
                }
            }
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })