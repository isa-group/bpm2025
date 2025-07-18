<template>
  <ion-modal :is-open="isOpen" @ionModalDidClose="closeModal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Privacy Note</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <h4>How we process your personal data</h4>
      <p>DTU, who is the organizer of ICPM 2024, as data controller, collects and processes information about you in connection with your registration and the partecipation to the conference.</p>
      <p>We process your information on the basis of Article 6(1)(b) and (e) of the Regulation and, in some cases, on the basis of your consent in accordance with Article 6(1)(a) of the Regulation.</p>

      <h4>Type of data</h4>
      <p>By registering for the ICPM Conference, you are added to the participant (delegates) list, which is shown in the ICPM App.</p>
      <p>We collect and process the following data:</p>
      <ul>
        <li>Name: Visible to all the participants using the ICPM App.</li>
        <li>Messages and pictures that you voluntarily upload to the ICPM App: Visible to all the participants using the ICPM App.</li>
        <li>Affiliation, country, e-mail, and profile picture: Visible to all the participants using the ICPM App only if you actively decide to share them.</li>
      </ul>
      <p>We do not process sensitive personal data in the ICPM App. Please do not share sensitive data via the ICPM App.</p>
      <p>Your data will not be disclosed by DTU to third parties unless we are obliged to provide the data because of a legal obligation or in order to perform a task in the public interest. DTU does not transfer your data to countries outside the European Union.</p>

      <h4>Storage and disclosure</h4>
      <p>We store your data on DTU servers for as long as necessary for the purpose for which the data is processed. When it is no longer relevant to store your data in order to fulfill its purpose, the data will be deleted or archived. This will happen no later than one year after the conference.</p>

      <h4>Your rights</h4>
      <p>When we process data about you, as the data subject, you have a number of rights:</p>
      <ul>
        <li>You have the right to request access, rectification, or erasure of your personal data.</li>
        <li>You also have the right to oppose the processing of your personal data and, in some cases, to have the processing of your personal data limited.</li>
        <li>Particularly, you have an unconditional right to oppose the processing of your personal data for direct marketing.</li>
        <li>If the processing of your personal data is based on your consent, you have the right to withdraw your consent at any time. Your withdrawal will not have any impact on the lawfulness of the processing carried out prior to your withdrawal of your consent.</li>
        <li>You are entitled to receive the personal data that you have submitted in a structured, commonly used, and machine-readable format (data portability).</li>
        <li>You can always file a complaint with a data protection supervisory authority, such as the Danish Data Protection Agency.</li>
      </ul>
      <p>There may be conditions for or restrictions to these rights. It is, therefore, not certain that you, for example, have the right to data portability in some cases – this depends on the specific circumstances surrounding the processing activities.</p>

      <h4>Legal entity responsible for the data processing</h4>

      <p>
      Danmarks Tekniske Universitet<br>
      DTU Compute<br>
      Richard Petersens Plads<br>
      Building 324<br>
      DK-2800 Kgs. Lyngby<br>
      E-mail: compute@compute.dtu.dk
      </p>

      <h4>Contact details of DTU's Data Protection Officer</h4>
      <p>DTU's DPO: dpo@dtu.dk</p>
    </ion-content>
  </ion-modal>
 </template>

<script setup lang="ts">
import {IonButtons, IonButton, IonContent, IonHeader, IonModal, IonTitle, IonToolbar} from "@ionic/vue";
import {ref, toRefs} from "vue";

const props = defineProps({
  isOpen: Boolean
});
const emit = defineEmits(['update:isOpen']);

const { isOpen } = toRefs(props);
const closeModal = (open: boolean) => (emit('update:isOpen', false));
</script>
