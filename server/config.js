module.exports = {
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
            email: {type: string, required: true}
            , userName: {type: string, required: true}
            , hashedPassword: {type: string, required: true}
            , authority: {type: string, 'default': 'user'}
            , volunteering: {type: array, 'default': []}
            , developing: {type: array, 'default': []}
            , salt: {type: string, required: true}
            , createdAt: {type: date, 'default': Date.now}
        },
        notice: {
            number: {type: int, unique:true}
            , writer: {type: string, required: true}
            , title: {type: string, required: true}
            , description: {type: string, 'default': ''}
            , createdAt: {type: date, 'default': Date.now}
            , updatedAt: {type: date, 'default': Date.now}
        },
        board:{
            number: {type: int, unique:true}
            , writer: {type: string, required: true}
            , title: {type: string, required: true}
            , description: {type: string, 'default': ''}
            , createdAt: {type: date, 'default': Date.now}
            , updatedAt: {type: date, 'default': Date.now}
        },
        volunteer:{
            number: {type: int, unique: true}
            , center: {type: string, required: true}
            , location: {type: string, 'default': ''}
            , leader: {type: string, required: true}
            , description: {type: string, 'default': ''}
            , member: {type: array, 'default': []}
            , personnel: {type: int, 'default': 9999}
            , date : {
                startDate: {type: date, required:true}
                , endDate: {type: date, required: true}
            }
        },
        develop:{
            number: {type: int, unique: true}
            , project: {type: string, required: true}
            , leader: {type: string, required: true}
            , description: {type: string, 'default': ''}
            , member: {type: array, 'default': []}
            , personnel: {type: int, 'default': 9999}
            , date : {
                startDate: {type: date, required:true}
                , endDate: {type: date, required: true}
            }
        }
    },
    ROUTE_INFOS: [
            {file: './Controller/user', path: '/sign-in', method: 'authorize_user', type:'get'}
            ,{file: './Controller/user', path: '/sign-up', method: 'register_user', type:'post'}

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
            ,{file: './Controller/board', path: '/board', method: 'render_board', type:'get'}
            ,{file: './Controller/intro', path: '/intro', method: 'render_intro', type:'get'}
            ,{file: './Controller/myPage', path: '/mypage', method: 'render_myPage', type:'get'}
        ]
}