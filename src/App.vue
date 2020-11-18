<template>
  <div class="lg:flex items-start justify-center">
    <div class="flex justify-center m-2 lg:m-8">
      <div class="form-container">

        <h1 class="text-5xl font-bold">Räkna ut min lön</h1>
        <p>Var så specifik som möjligt för bästa statistik</p>

        <div class="flex justify-end items-center mt-4">
          <BaseSelect
            label="Utbildning"
            :options="educationOptions"
            v-model="education"
          />
        </div>

        <div class="flex justify-end items-center mt-1">
          <BaseSelect
            label="Region"
            :options="regionOptions"
            v-model="region"
          />
        </div>

        <div class="flex justify-end items-center mt-1">
          <BaseSelect
            label="Arbetslivserfarenhet (år)"
            :options="experienceOptions"
            v-model.number="experience"
          />
        </div>

        <div class="flex justify-end items-center mt-1">
          <BaseSelect
            label="I min bransch är jag duktigare än"
            :options="expertiseOptions"
            v-model="expertise"
          />
        </div>

        <p v-if="mySalary" class="text-4xl mt-8">Du ska ha
          <span class="font-bold text-5xl">{{mySalary}}kr</span> i lön
        </p>

        <!--<pre>{{salaryData}}</pre>-->

        <!--<button @click="getSalaryByExperience(dataPoints)">Get Salary</button>-->
      </div>
    </div>

    <div class="flex flex-col items-center p-4 description">
      <h2 class="text-2xl mb-1">Hur lönen är uträknad</h2>
      <p class="text-left">
        Algoritmen använder <a href="https://sv.wikipedia.org/wiki/Regressionsanalys">linjär regression</a>
        för att för varje dataset estimera lön som en funktion av antal års erfarenhet.
        För varje <i>grupp</i> används ett eget dataset, där en <i>grupp</i> definieras av kombinationen:
      </p>
        
      <ul class="self-stretch text-left my-2">
        <li>- utbildning</li>
        <li>- region</li>
        <li>- hur duktig du är</li>
      </ul>

      <p class="text-left">
        Om du anser dig vara duktigare än 75% i din bransch till exempel,
        så används lönen vid den 75e percentilen av datasetet.
        Då lönerna är mindre flexibla i början är de partiska mot de
        verkliga datapunkterna i början (0-4 års erfarenhet).
        <br><br>
        Datan som används är från SACO.
      </p>
      <img src="./assets/it-stockholm-90.png" class="demo-image mt-2">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import civilingenjorData from './data/sverige/2019/civilingenjor'
import civilingenjorItData from './data/sverige/2019/civilingenjor-it'

import { SalaryData, RegionSalaryData, DataPoint, ExpertiseSalaries } from './data/types'

import getSalaries from './model'


const salaryData = {
  civing: civilingenjorData,
  civingIt: civilingenjorItData,
} as { [key: string]: SalaryData }

const experienceOptions: { name: string; value: number }[] = []
for (let i = 0; i < 25; i++) {
  experienceOptions.push({ name: i.toString(), value: i })
}
experienceOptions.push({ name: '25+', value: 25 })

type SalaryByExperience = { [key: number]: number } | null

let salaryByExperiencePromise

export default defineComponent({
  name: 'App',
  components: {
  },
  data() {
    return {
      education: 'civing',

      educationOptions: [
        { name: 'Civilingenjör', value: 'civing' },
        { name: 'Civilingingenjör data/IT', value: 'civingIt' }
      ],

      region: 'Hela Sverige' as 'Hela Sverige' | 'Stockholm',
      regionOptions: [
        { name: 'Hela Sverige', value: 'Hela Sverige' },
        { name: 'Stockholm', value: 'Stockholm' },
      ],

      experience: 0,
      experienceOptions,

      expertise: '50' as '10' | '25' | '50' | '75' | '90',
      expertiseOptions: [
        { name: '10%', value: '10', },
        { name: '25%', value: '25', },
        { name: '50%', value: '50', },
        { name: '75%', value: '75', },
        { name: '90%', value: '90', },
      ],

      salaryByExperience: null as SalaryByExperience
    }
  },
  computed: {
    salaryData(): SalaryData {
      return salaryData[this.education]
    },
    regionSalaryDataOriginal(): ExpertiseSalaries {
      return this.salaryData[this.region].original
    },
    regionSalaryData(): ExpertiseSalaries {
      return this.salaryData[this.region].predicted
    },
    expertiseData(): number[] {
      return this.regionSalaryData[this.expertise]
    },
    expertiseDataOriginal(): number[] {
      return this.regionSalaryDataOriginal[this.expertise]
    },
    dataPoints(): DataPoint[] {
      const dataPoints = this.expertiseData.map((salary: number, experience: number) => ({
        salary,
        experience,
      }))
      return dataPoints
    },
    mySalary(): number {
      if (this.experience < 5) {
        const recc = this.expertiseData[this.experience]
        const original = this.expertiseDataOriginal[this.experience]
        return Math.round(recc + (original - recc) * 2 / (3 + this.experience))
      } else {
        return this.expertiseData[this.experience]
      }
    }
  },
  methods: {
    async getSalaryByExperience(dataPoints: DataPoint[]) {
        const salaries = await getSalaries(dataPoints)
        const salaryByExperience = salaries.reduce((acc: SalaryByExperience, v: { x: number; y: number }) => {
          (acc as any)[Math.round(v.x)] = Math.floor(v.y)
          return acc
        }, {} as SalaryByExperience)
        console.log(this.education, this.region, this.expertise, Object.values(salaryByExperience as any).join(','))
        return salaryByExperience
    },
  }
});
</script>

<style lang="scss">
.form-container {
  max-width: 30rem;
}

#app {
  //font-family: 'Nunito', sans-serif;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text;
  margin-top: 20px;
}

.description {
  max-width: 30rem;
  margin-left: auto;
  margin-right: auto;
}
.demo-image {
  width: 100%;
  border: 2px solid $dark-1;
  max-width: 30rem;
}

a {
  color: $primary;
  transition: color 0.2s ease;
  &:hover {
    color: $primary-2;
  }
}
</style>
