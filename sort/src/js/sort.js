const gnome_sort = (v) => {
    let stages = [] 
    let index = 0
    stages.push(v)

    while(index != v.length){
        let next_stage = [...stages[stages.length-1]]
        if(index == 0){
            index += 1
        } else if(next_stage[index] < next_stage[index-1]) {
            const t = next_stage[index]
            next_stage[index] = next_stage[index-1] 
            next_stage[index-1] = t

            index -= 1
        } else {
            index += 1
        }

        stages.push(next_stage)
    }
    return stages
}

module.exports = { gnome_sort }