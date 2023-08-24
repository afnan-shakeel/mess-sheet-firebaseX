<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isEditing = ref(false);
const todayOptions = [{value:'YES', title:'Yes'},{value:'NO', title:'No'},{value:'NF', title:'No Food'}];
const tomorrowOptions = [{value:'YES', title:'Yes'},{value:'NO', title:'No'}];

const rows = ref([
  {id: 0, title: "Breakfast", label1: 'Today', label2: 'Tomorrow', selectedValues: { today: '', tomorrow: '' } },
  {id: 0, title: "Lunch", label1: 'Today', label2: 'Tomorrow', selectedValues: { today: '', tomorrow: '' } },
  {id: 0, title: "Dinner", label1: 'Today', label2: 'Tomorrow', selectedValues: { today: '', tomorrow: '' } }
]);

onMounted(()=>{
  fetchValues()
})

const fetchValues = async ()=>{
  // db values [for edit]
  var values = [{id:1, title:'Breakfast', today:'Yes', tomorrow:'No'}]

  for (let item of rows.value){
    for(let el of values){
      if(el.title === item.title){
        item.id = el.id
        item.selectedValues.today = el.today
        item.selectedValues.tomorrow = el.tomorrow
      }
    }
  }
}


const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
  if (isEditing.value == false) {
    console.log(rows.value)
  }
};

</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h2>Edit Log</h2>
          </v-card-title>
          <v-card-text>
            <v-btn @click="toggleEditMode" color="primary">
              {{ isEditing ? 'Save' : 'Edit' }}
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-row v-for="row in rows" :key="row.title">
              <v-col cols="12">
                <h3>{{ row.title }}</h3>
              </v-col>
              <v-col cols="6">
                <v-select v-model="row.selectedValues.today" :items="todayOptions" :label="row.label1"
                  :disabled="!isEditing"></v-select>
              </v-col>
              <v-col cols="6">
                <v-select v-model="row.selectedValues.tomorrow" :items="tomorrowOptions" :label="row.label2"
                  :disabled="!isEditing"></v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
