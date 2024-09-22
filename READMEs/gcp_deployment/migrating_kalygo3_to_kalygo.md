# TLDR

Documenting the process of setting up the Kalygo v3.0 application in the `kalygo` project in GCP. Due to demands, the `kalygo-v3` project turned into the home of the `SWARMS PLAYGROUND` application

## Set up a new Service Account in the `kalygo` project

- Create and add the Service Account key to the relevant GitHub repo
- Update the GCP_SA_KEY Actions Secret

## Add CICD permissions

- Attach needed permissions to the S.A. account for enabling CICD
- `gcloud config configurations activate kalygo`
- Add the following permission to the newly created Service Account
  ```
  1. gcloud projects add-iam-policy-binding kalygo-436411 \
  --member="serviceAccount:kalygo-sa@kalygo-436411.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"
  2. gcloud projects add-iam-policy-binding kalygo-436411 \
  --member="serviceAccount:kalygo-sa@kalygo-436411.iam.gserviceaccount.com" \
  --role="roles/run.admin"
  3. gcloud iam service-accounts add-iam-policy-binding 830723611668-compute@developer.gserviceaccount.com \
  --member="serviceAccount:kalygo-sa@kalygo-436411.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
  ```