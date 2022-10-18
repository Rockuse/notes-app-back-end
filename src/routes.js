const addNoteHandler=require("./handler")
const routes =[
    {
        method:'GET',
        path:"/",
        handler:addNoteHandler
    }
]