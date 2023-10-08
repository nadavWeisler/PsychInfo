import {readJsonFile} from "@/app/api/utils";
export function GET(request: any) {

    const paramsString = request.url.split("?")[1]
    const eachParamArray = paramsString.split('&');
    let params = {};
    eachParamArray.forEach((param: string) => {
        const key = param.split('=')[0];
        params[key] = param.split('=')[1];
    })
    let tags = params["tags"].split(',')
    const data = readJsonFile('C:\\Users\\User\\WebstormProjects\\PsychInfo\\psych-info-ui\\src\\data\\data.json');
    let res = [];
    for (let key in data) {
        console.log(key)
        for (let j = 0; j < tags.length; j++) {
            console.log(tags[j])
            if (data[key]['tags'].split(",").includes(tags[j])) {
                console.log(data[key]['tags'])
                res.push(data[key]);
            }
        }
    }
    return Response.json(res);
}