export const nodes=[
    {
        id:"1",
        position:{
            x:200,
            y:100
        },
        data:{
            label:"start"
        },
        type:"start"
    },
    {
        id:"a",
        position:{
            x:200,
            y:200
        },
        data:{
            label:"+"
        },
        type:"plusNod"
    }
]
export const edges=[{
    id:"s-e1",              
    source:"1",
    target:"a",
    sourceHandle: 'a',
}]