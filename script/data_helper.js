export class Data_Helper {
    BASE_URL = "EAFC-Namur-Cadets/script/data.json";

    async getDataByTypeEnseignement () {
        let url = this.BASE_URL;

        let http_response = await fetch(url);

        return await http_response.json();
    }
}
