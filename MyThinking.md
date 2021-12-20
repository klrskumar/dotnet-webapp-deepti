1. I preferred to go with single page application instead of multi page application on consideration of performance, 
	because we dont want load pages repeatedly, instead we just call the rest api to render the data.
2. I have consumed the git hub Api calls directly from the client app, instead of consuming from Controller, which I feel it 
	is unnecessary round trip.  
3. Regarding performance i can improve it by caching the records, for that we can use Akita (global store), which will prevent service
	calls unless it is not necessary.  
4. For linting, I have used TSLint in VS Code, and Powerful Tools extension in Visual Studio, and followed the recommendations
	give by the tool.
5. Instead of hosting the application, i have taken screenshots of the pages and attached a folder inside the solution. Please go through
	that for the look and feel of the application.