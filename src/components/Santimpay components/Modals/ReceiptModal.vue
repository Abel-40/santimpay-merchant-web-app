<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import type { TransactionType } from '@/types/Types';
import Modal from '@/components/Modal.vue';
import ReceiptComposables from '@/composables/ReceiptComposables';
import { Download } from 'lucide-vue-next';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { computed } from 'vue';

const downloadInvoice = async () => {
  const invoiceElement = document.querySelector('.print\\:w-\\[210mm\\]'); // escape characters due to Tailwind
  if (!invoiceElement) return;

  const canvas = await html2canvas(invoiceElement as HTMLElement, { scale: 3 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgProps = pdf.getImageProperties(imgData);

  const margin = 10;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pdfWidth = pageWidth - margin * 2;
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  const centerX = (pageWidth - pdfWidth) / 2;

  pdf.addImage(imgData, 'PNG', centerX, margin, pdfWidth, pdfHeight);
  pdf.save(`invoice_${props.transaction.transactionId}.pdf`);
};


const printInvoice = () => {
  window.print()
}
const {whenClose,isModalOpen} = ReceiptComposables()
const props = defineProps<{
  transaction: {
    transactionId?: string;
    amount?: number;
    status?: 'SUCCESSFULL' | 'FAILED' | 'IN PROGRESS';
    dateAndTime?: string;
    sender?: string;
    reciver?: string;
    paymentType?: string;
    bankName?: string;
    reason?:string;
  }
}>();

</script>


<template>
  <Modal :isOpen="isModalOpen" @onClose="whenClose" title="" description="" class="print:hidden">
  <div class="flex justify-center px-14 ">
          <!-- invoice -->
      <div class="print:w-[210mm] print:min-h-[297mm] p-3 print:p-[20mm] print:box-border space-y-5 w-[770px] border-[2px]  bg-[url('/src/assets/invoicebg.png')] bg-center bg-contain bg-no-repeat font-semibold">
        <!-- logo + address -->
        <div class=" flex justify-between">
           <!-- Logo -->
          <div class="flex items-start gap-2 mb-6">
                <div class="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                  <div class="w-[35px] h-[35px] rounded-sm flex flex-col items-center justify-center shadow-md p-5 border">
                    <p class="text-[8px] font-bold text-Black tracking-tighter">SANTIM</p>
                    <p class="text-xs font-extrabold text-yellow-300 tracking-tighter pb-2">PAY</p>
                  </div>
                </div>
                <span class=" font-bold pl-">
                  <span class="text-xs">
                    SANTIM 
                  </span>
                  <span class="text-sm text-yellow-300">
                    PAY
                  </span>
                </span>
          </div>


          <!-- address -->
           <div class="flex flex-col text-xs space-y-1 ">
            <p>Santim Pay</p>
            <div class="grid grid-cols-2">
              <p>TIN No.</p>
              <p>0000123456</p>
            </div>

            <div class="grid grid-cols-2">
              <p>VAT Reg. No.</p>
              <p>123456</p>
            </div>

            <div class="grid grid-cols-2">
              <p>VAT Reg. Date</p>
              <p>april/24/2025</p>
            </div>

            <div class="grid grid-cols-2">
              <p>P.O.Box</p>
              <p>1047 Addis Ababa, Ethiopia</p>
            </div>

            <div class="grid grid-cols-2">
              <p>Tel.</p>
              <p>+251908932165</p>
            </div>
           </div>
        </div>
 
        <!-- transaction information -->
        <div class="w-full flex flex-col itmes-center px-4 space-y-3 text-xs">
          <div class="border-y-[2px] flex  justify-center items-start py-3">
              <p class="print:font-semibold ">Transaction Information</p>
          </div>

          <div class="w-full flex flex-col px-4">
            <div class="grid grid-cols-2 ">
              <p>Transaction Id/የግብይት መለያ ቁጥር</p>
              <p>{{ props.transaction.transactionId }}</p>
            </div>
            <div class="grid grid-cols-2">
              <p>Status/ሁኔታ</p>
              <p>{{ props.transaction.status }}</p>
            </div>

            <div class="grid grid-cols-2">
              <p>Date & Time/ቀን እና ሰዓት</p>
              <p>{{ props.transaction.dateAndTime?.split('T')[0]}} - {{ props.transaction.dateAndTime?.split('T')[1] }}</p>
            </div>

            <div class="grid grid-cols-2">
              <p>Sender/ላኪ</p>
              <p>{{ props.transaction.sender }}</p>
            </div>

            <div class="grid grid-cols-2">
              <p>Reciever/ተቀባይ</p>
              <p>{{ props.transaction.reciver }}</p>
            </div>

            <div class="grid grid-cols-2">
              <p>Payment Type/የክፍያ ዓይነት</p>
              <p>{{ props.transaction.paymentType }}</p>
            </div>
            <div class="grid grid-cols-2">
              <p>Bank/ባንክ</p>
              <p>{{ props.transaction.bankName }}</p>
            </div>
          </div>

        </div>

        <!-- Transaction Detials -->
        <div class="px-4 text-xs">

          <div>
            <table class="w-full table-fixed text-center">
              <thead>
                <tr class="bg-yellow-50 border-y-[2px]">
                  <th colspan="3" class="border border-black p-2 text-center pb-4">Transaction details</th>
                </tr>
                <tr>
                  <th class="border border-black p-2 font-medium">የተከፈለ ቁጥር/Receipt No.</th>
                  <th class="border border-black p-2 font-medium">የክፍያ ምክንያት/Payment reason</th>
                  <th class="border border-black p-2 font-medium">የተከፈለው መጠን/Settled Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-black p-2">{{props.transaction.transactionId}}</td>
                  <td class="border border-black p-2">{{props.transaction.reason}}</td>
                  <td class="border border-black p-2">{{props.transaction.amount}} Birr</td>
                </tr>
                <tr>
                  <td colspan="2" class="p-2 text-right">የአገልግሎት ክፍያ/Service fee</td>
                  <td class="border border-black p-2">0.00 Birr</td>
                </tr>
                <tr>
                  <td colspan="2" class="p-2 text-right">የአገልግሎት ክፍያ ቫት/Service fee VAT</td>
                  <td class="border border-black p-2">0.00 Birr</td>
                </tr>
                <tr>
                  <td colspan="2" class="p-2 text-right font-semibold">ጠቅላላ የከፈለው/Total Paid Amount</td>
                  <td class="border border-black p-2 font-semibold">{{ props.transaction.amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="">
            <p class="font-semibold">Authority Signiture</p>
              <img src="/src/assets/signiture.png" class="w-24 ">
          </div>
         </div>
      </div>
  </div>
  <div class="w-full flex justify-center print:hidden">
    <Button class="bg-[#eab308] w-[50%] transition-all scale-100 duration-100 active:scale-105 hover:bg-[#eab308]/50" @click="downloadInvoice" :disabled="props.transaction.status==='FAILED'|| props.transaction.status==='IN PROGRESS'"><Download />Download</Button>
  </div>

</Modal>
</template>