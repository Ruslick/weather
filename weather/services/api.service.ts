import axios from "axios";

export const getWeather = async (city: string, token: string, lang: string) => {
	const { data } = await axios.get(
		"https://api.openweathermap.org/data/2.5/weather",
		{
			params: {
				q: city,
				appid: token,
				lang: lang,
				units: "metric",
			},
		}
	);
  return data
};
