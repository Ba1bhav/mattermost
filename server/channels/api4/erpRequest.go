package api4

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type ErpDetails struct {
	Data struct {
		Name       string `json:"name"`
		EmployeeId string `json:"employeeId"`
		SkypeId    struct {
			Email string `json:"email"`
		} `json:"skypeId"`
	} `json:"data"`
}

type ERPLoginReq struct {
	Login string `json:"loginId"`
	Pass  string `json:"password"`
}

func ErpRequest(loginId string, password string) string {

	payload := ERPLoginReq{
		Login: loginId,
		Pass:  password,
	}

	erpReq, _ := json.Marshal(&payload)
	url := "https://apigateway.erp.chicmic.in/v1/auth/login"
	method := "POST"
	client := &http.Client{}
	req, err := http.NewRequest(method, url, bytes.NewBuffer(erpReq))

	if err != nil {
		fmt.Println(err)
		return ""
	}
	req.Header.Add("sec-ch-ua", "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"")
	req.Header.Add("Accept", "application/json, text/plain, */*")
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Referer", "https://timedragon.chicmic.in/")
	req.Header.Add("sec-ch-ua-mobile", "?0")
	req.Header.Add("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")

	fmt.Println("request is ", req)
	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	fmt.Println("response is", res)
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	fmt.Println("body is", string(body))
	var erpBody ErpDetails
	err = json.Unmarshal(body, &erpBody)
	if err != nil {
		fmt.Println("eroor aa gya bhai")
		return ""
	}
	return erpBody.Data.SkypeId.Email

}
