# Receita Facil Frontend
A frontend app built with Vite to help doctors create medical prescriptions quickly and inclusively for illiterate patients. The app uses visual cues, images, and icons to simplify the process and enhance comprehension.

## Requirements

- Node.js v22.10 or higher

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_directory>
  ```
2. Install dependencies: 
```bash
 npm install
```

3. Running Project
```bash
  npm run dev
```
Once the server is running, access the app at http://localhost:5173.


## Build Registry

if you have docker installed use

docker build -t gcr.io/<GCP_PROJECT_ID>/<PROJET_NAME>:v<VERSION>
EX: docker build -t gcr.io/hellodpiresworld/receita-facil:v1.0.0 .

docker push <IMAGE BUILDED>
ex: docker push gcr.io/hellodpiresworld/receita-facil:v1.0.0 

if you do not have all permissions or docker localy installed:

gcloud builds submit . --tag gcr.io/<GCP_PROJECT_ID>/<PROJET_NAME>:v<VERSION>

ex: gcloud builds submit . --tag gcr.io/hellodpiresworld/receita-facil:v1.0.0

## Deploy application

gcloud run deploy receita-facil \
  --image gcr.io/hellodpiresworld/receita-facil \
  --platform managed \
  --region southamerica-east1 \
  --allow-unauthenticated \
  --ingress=all
