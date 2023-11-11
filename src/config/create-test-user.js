import bcrypt from "bcrypt";

import USER from "../model/user.js"
import ROLE_ID from "../constants/role-id.js"

const createTestUser = async() =>{
    const ifEmpty = await USER.find();
    if (ifEmpty.length === 0) {
        const hashedPwdAdmin = await bcrypt.hash("admin", 10);
        const hashedPwdAuditor = await bcrypt.hash("auditor", 10);
        const hashedPwdUser = await bcrypt.hash("user", 10);

        const docs = [{
                username: 'admin',
                password: hashedPwdAdmin,
                roleId: ROLE_ID.ADMIN
            },{
                username: 'auditor',
                password: hashedPwdAuditor,
                roleId: ROLE_ID.AUDITOR
            },{
                username: 'user',
                password: hashedPwdUser,
                roleId: ROLE_ID.USER
            }
        ];

        await USER.insertMany(docs);
    }
}

export default createTestUser;