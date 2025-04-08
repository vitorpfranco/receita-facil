import { create } from "zustand";
import { Drug } from "../types/drug";
import { v4 as uuidv4 } from 'uuid';
import { buildTypeIssuer, PrescriptionTypeValues, specialPrescriptionEnabledCities, validPrescriptionTypes } from "../utils/prescriptionTypeUtils";
import { Issuer } from "../types/specialPrescription";

const getPrescriptionType = (): PrescriptionTypeValues | null => {
    const storedType = localStorage.getItem("prescriptionTypeValue");

    if (storedType) {
        if (!validPrescriptionTypes.includes(storedType as PrescriptionTypeValues)) {
            localStorage.setItem("prescriptionTypeValue", "default");
            return "default";
        }
        return storedType as PrescriptionTypeValues;
    }

    return null;
};

type PrescriptionStore = {
    selectedDrugs: Drug[];
    setSelectedDrugs: (selectedDrugs: Drug[]) => void;
    addSelectedDrug: (drug: Drug) => void;
    removeSelectedDrug: (drug: Drug) => void;
    resetSelectedDrugs: () => void;
    addCumtomDrug: () => void;
    updateSelectedDrug: (uuid: string, updates: Partial<Drug>) => void;

    //type
    prescriptionTypeValue: PrescriptionTypeValues | null;
    setPrescriptionTypeValue: (type: PrescriptionTypeValues) => void;
    showPrescriptionTypeModal: boolean;
    setShowPrescriptionTypeModal: (unit: boolean) => void;

    //header
    healthUnit: string;
    setHealthUnit: (unit: string) => void;
    patientName: string;
    setPatientName: (name: string) => void;
    adress: string;
    setAdress: (adress: string) => void;
    recordNumber: string;
    setRecordNumber: (record: string) => void;

    //controls
    hideDate:boolean;
    setHideDate: (unit: boolean) => void;
    specialPrescription: boolean;
    setSpecialPrescription: (unit: boolean) => void;
    duplicatePrescription: boolean;
    setDuplicatePrescription: (unit: boolean) => void;

    // Issuer Information (special prescription)
    issuer: Partial<Issuer> | null;
    setIssuer: (updates: Partial<Issuer>) => void;

}

export const usePrescriptionStore = create<PrescriptionStore>((set) => ({
    selectedDrugs: [],
    setSelectedDrugs: (selectedDrugs: Drug[]) => set({ selectedDrugs }),
    addSelectedDrug: (drug: Drug) => {
        const formattedText = `${drug.name} ------ ${drug.quantity || ''}\n${drug.instructions || ''}`;

        const parsedIcons = drug.support_icons
            ? drug.support_icons.split(",")
            : [];

        const newDrug = {
            ...drug,
            uuid: uuidv4(),
            instructions: drug.is_image ? drug.instructions : formattedText,
            icons: parsedIcons,
        };

        set((state) => ({
            selectedDrugs: [...state.selectedDrugs, newDrug],
        }));
    },

    updateSelectedDrug: (uuid, updates) => {
        set((state) => ({
            selectedDrugs: state.selectedDrugs.map((drug) =>
                drug.uuid === uuid ? { ...drug, ...updates } : drug
            ),
        }));
    },
    addCumtomDrug: () => {
        const formattedText = `Nome do medicamento ------ Quantidade`;
        const newDrug = { uuid: uuidv4(), id:-1, name: "Medicamento", category: "Outros", instructions: formattedText };
        set((state) => ({ selectedDrugs: [...state.selectedDrugs, newDrug] }))
    },
    removeSelectedDrug: (drug: Drug) => set((state) => ({ selectedDrugs: state.selectedDrugs.filter((item) => item.uuid !== drug.uuid) })),
    resetSelectedDrugs: () => set({ selectedDrugs: [] }),

    //type
    prescriptionTypeValue: getPrescriptionType(),
    setPrescriptionTypeValue: (type: PrescriptionTypeValues) => {
        localStorage.setItem("prescriptionTypeValue", type);
        set((state) => ({
            prescriptionTypeValue: type,
            showPrescriptionTypeModal: false,
            specialPrescription: specialPrescriptionEnabledCities.includes(
                type!
            ) ? state.specialPrescription : false,
        }));
    },
    showPrescriptionTypeModal: false,
    setShowPrescriptionTypeModal: (show: boolean) => set({ showPrescriptionTypeModal: show }),

    //header
    healthUnit: "",
    setHealthUnit: (unit: string) => set({ healthUnit: unit }),
    patientName: "",
    setPatientName: (name: string) => set({ patientName: name }),
    adress: "",
    setAdress: (adress: string) => set({ adress: adress }),
    recordNumber: "",
    setRecordNumber: (record: string) => set({ recordNumber: record }),

    //controls
    hideDate: false,
    setHideDate: (hideDate: boolean) => set({ hideDate: hideDate }),
    specialPrescription: false,
    setSpecialPrescription: (specialPrescription: boolean) => set((state) => ({
        specialPrescription: specialPrescription,
        duplicatePrescription: specialPrescription,
        issuer: state.issuer ? state.issuer : buildTypeIssuer(state.prescriptionTypeValue || 'default'),
    })),
    duplicatePrescription: false,
    setDuplicatePrescription: (duplicatePrescription: boolean) => set({ duplicatePrescription: duplicatePrescription }),
    issuer: null,
    setIssuer: (updates) => set((state) => ({ issuer: { ...(state.issuer ?? {}), ...updates } })),
}));

