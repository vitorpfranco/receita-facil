import { Issuer } from "../types/specialPrescription";

export const validPrescriptionTypes = [
    "default",
    "bodoco",
    "ourolandia",
    "petrolina",
    "sus",
    "andorinhaPrefeitura",
    "andorinhaSecretaria",
    "jaguarari",
    "jaguarariPrefeitura",
    "jaguarariSemus",
    "santacruz",
    "santaFilomena",
    "trindade",
] as const;

export type PrescriptionTypeValues = (typeof validPrescriptionTypes)[number];

type PrescriptionType = {
    value: PrescriptionTypeValues;
    label: string;
    imageUrl: string;
};
export const specialPrescriptionEnabledCities: PrescriptionTypeValues[] = [
    "petrolina",
    "ourolandia",
];
export const buildTypeIssuer = (prescriptionTypeValue: PrescriptionTypeValues): Issuer => {
    const configuration = prescriptionTypeConfigurations[prescriptionTypeValue];
    if (!configuration) {
        return {
            name: "",
            crm: "",
            uf: "",
            address: "",
            cnpj: "",
            phone: "",
        }
    }
    return configuration.issuer;
}

const prescriptionTypeConfigurations: Partial<Record<PrescriptionTypeValues, { issuer: Issuer }>> = {
    "petrolina": {
        issuer: {
            name: "",
            crm: "",
            uf: "PE",
            address: "Av. Fernando Góes, S/N, Centro, Petrolina-PE",
            cnpj: "06.914.894/0001-01",
            phone: "(87) 3866-8550",
        },
    }
}
export const prescriptionTypeOptions: PrescriptionType[] = [
    {
        value: "default",
        label: "Padrão",
        imageUrl: "",
    },
    {
        value: "bodoco",
        label: "Bodocó",
        imageUrl: "bodocoLogo.png",
    },
    {
        value: "ourolandia",
        label: "Ourolândia",
        imageUrl: "ourolandiaLogo.png",
    },
    {
        value: "petrolina",
        label: "Petrolina",
        imageUrl: "petrolinaLogo.png",
    },
    {
        value: "andorinhaPrefeitura",
        label: "Andorinha Prefeitura",
        imageUrl: "andorinhaPrefeituraLogo.png",
    },
    {
        value: "andorinhaSecretaria",
        label: "Andorinha Secretaria",
        imageUrl: "andorinhaSecretariaLogo.png",
    },
    {
        value: "jaguarari",
        label: "Jaguarari",
        imageUrl: "jaguarariLogo.png",
    },
    {
        value: "jaguarariPrefeitura",
        label: "Jaguarari Prefeitura",
        imageUrl: "jaguarariPrefeituraLogo.png",
    },
    {
        value: "jaguarariSemus",
        label: "Jaguarari Semus",
        imageUrl: "jaguarariSemusLogo.png",
    },
    {
        value: "santacruz",
        label: "Santa Cruz",
        imageUrl: "santaCruzLogo.png",
    },
    {
        value: "santaFilomena",
        label: "Santa Filomena",
        imageUrl: "santaFilomenaLogo.png",
    },
    {
        value: "trindade",
        label: "Trindade",
        imageUrl: "trindadeLogo.png",
    },
];
