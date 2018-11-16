module.exports = {
    SERVER_HOST: 'http://49.236.134.66:',
    SERVER_PORT: 3000,
    DB_URL: 'mongodb://localhost:27017/local',
    DB_SCHEMAS: [
            {
                file: './Schema/user'
                , collection: 'user'
                , schemaName: 'userSchema'
                , modelName: 'userModel'
            },
            {
                file: './Schema/notice'
                , collection: 'notice'
                , schemaName: 'noticeSchema'
                , modelName: 'noticeModel'
            },
            {
                file: './Schema/board'
                , collection: 'board'
                , schemaName: 'boardSchema'
                , modelName: 'boardModel'
            },
            {
                file: './Schema/volunteer'
                , collection: 'volunteer'
                , schemaName: 'volunteerSchema'
                , modelName: 'volunteerModel'
            },
            {
                file: './Schema/develop'
                , collection: 'develop'
                , schemaName: 'developSchema'
                , modelName: 'developModel'
            }
        ],
    DB_MODELS: {
        user: {
            email: {type: String, required: true}
            , userName: {type: String, required: true}
            , hashedPassword: {type: String, required: true}
            , authority: {type: String, 'default': 'user'}
            , volunteering: {type: Array, 'default': []}
            , developing: {type: Array, 'default': []}
            , salt: {type: String, required: true}
            , createdAt: {type: Date, 'default': Date.now}
            , privateInfo: {
                studentID: {type:Number}
                , birthDate: {type:Date}
                , id1365: {type: String}
            }
        },
        notice: {
            number: {type: Number, unique:true}
            , writer: {type: String, required: true}
            , title: {type: String, required: true}
            , description: {type: String, 'default': ''}
            , createdAt: {type: Date, 'default': Date.now}
            , updatedAt: {type: Date, 'default': Date.now}
        },
        board:{
            number: {type: Number, unique:true}
            , writer: {type: String, required: true}
            , title: {type: String, required: true}
            , description: {type: String, 'default': ''}
            , createdAt: {type: Date, 'default': Date.now}
            , updatedAt: {type: Date, 'default': Date.now}
        },
        volunteer:{
            center: {type: String, required: true}
            , semester: {type: String, required: true}
            , location: {type: String, 'default': ''}
            , leader: {type: String, required: true}
            , description: {type: String, 'default': ''}
            , member: {type: Array, 'default': []}
            , personnel: {type: Number, 'default': 9999}
            , time: {type: String, required: true}
            ,weeklyRecord:{ type:Array, 'default': []}
        },
        develop:{
            project: {type: String, required: true}
            , semester: {type: String, required: true}
            , leader: {type: String, required: true}
            , description: {type: String, 'default': ''}
            , member: {type: Array, 'default': []}
            , personnel: {type: Number, 'default': 9999}
        }
    },
    ROUTE_INFOS: [
            {file: './Controller/main', path:'/', method: 'render_main', type:'get'}
            ,{file: './Controller/intro', path: '/intro', method: 'render_intro', type:'get'}
            ,{file: './Controller/myPage', path: '/mypage/:username', method: 'render_myPage', type:'get'}

            ,{file: './Controller/user', path: '/signin', method: 'render_signIn', type:'get'}
            ,{file: './Controller/user', path: '/signup', method: 'render_signUp', type:'post'}

            ,{file: './Controller/volunteer', path: '/volunteer', method: 'render_volunteer', type:'get'}
            ,{file: './Controller/volunteer', path: '/volunteer/:center', method: 'render_volunteer_center', type:'get'}
            ,{file: './Controller/volunteer', path: '/volunteer/:center', method: 'register_volunteer_center', type:'post'}
            ,{file: './Controller/volunteer', path: '/volunteer/apply/:center', method: 'apply_volunteer_center', type:'post'}
            ,{file: './Controller/volunteer', path: '/volunteer/delete/:center', method: 'delete_volunteer_center', type:'delete'}

            ,{file: './Controller/develop', path: '/develop', method: 'render_develop', type:'get'}
            ,{file: './Controller/develop', path: '/develop/:project', method: 'render_develop_project', type:'get'}
            ,{file: './Controller/develop', path: '/develop/:project', method: 'register_develop_project', type:'post'}
            ,{file: './Controller/develop', path: '/develop/apply/:project', method: 'apply_develop_project', type:'post'}
            ,{file: './Controller/develop', path: '/develop/delete/:project', method: 'delete_develop_project', type:'delete'}

            ,{file: './Controller/notice', path: '/notice', method: 'render_notice', type:'get'}
            ,{file: './Controller/notice', path: '/notice', method: 'write_notice', type:'post'}
            ,{file: './Controller/notice', path: '/notice/:number', method: 'render_notice_number', type:'get'}

            ,{file: './Controller/board', path: '/board', method: 'render_board', type:'get'}
            ,{file: './Controller/board', path: '/board', method: 'write_board', type:'post'}
            ,{file: './Controller/board', path: '/board/:number', method: 'render_board_number', type:'get'}
        ],
    MAIN_NOTICES: 3,
    MAIN_VOLUNTEERS: 3
}