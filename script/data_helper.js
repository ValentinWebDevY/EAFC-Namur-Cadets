export class Data_Helper {
    BASE_URL = "../script/data.json";

    async getDataByTypeEnseignement () {
        let url = this.BASE_URL;

        let http_response = await fetch(url);

        return await http_response.json();
    }
}