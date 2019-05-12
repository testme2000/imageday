import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vue from "vue"
import DisplayImage from './src/components/DisplayImage.vue'
import { JestEnvironment } from '@jest/environment';

describe("DisplayImage Basic Layout Test", () => {
    ////////////////////////////////////////////////////////////////////
    // Prepare inital setup
    let sampleResult = {
        "title" : "sample image",
        "detailExplanation" : "Sample details",
        "copyright" : "sample copyright",
        "urlinfo"  : "imge.png"    
    }
    // 1. Mount the app
    let imgWrapper = mount(DisplayImage, {
            propsData : {
                imagedetail : sampleResult
            }
    })
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    // Basic App Property Checking
    test("Display Image Layout Verification", () => {
        // 1. Validate instance
        expect(imgWrapper.isVueInstance()).toBeTruthy();
        // 2. Layout - Div
        expect(imgWrapper.html().includes("div")).toBe(true);
        expect(imgWrapper.find("div").isVisible()).toBe(true);
        let tagarray = imgWrapper.findAll("div");
        expect(tagarray.length).toBe(1);
        // 3. Layout - table
        expect(imgWrapper.html().includes("table")).toBe(true);
        expect(imgWrapper.find("table").isVisible()).toBe(true);
        tagarray = imgWrapper.findAll("table");
        expect(tagarray.length).toBe(1);
        // 4. Layout - row
        expect(imgWrapper.html().includes("tr")).toBe(true);
        expect(imgWrapper.find("tr").isVisible()).toBe(true);
        tagarray = imgWrapper.findAll("tr");
        expect(tagarray.length).toBe(3);
        // 4. Layout - td
        expect(imgWrapper.html().includes("td")).toBe(true);
        expect(imgWrapper.find("td").isVisible()).toBe(true);
        tagarray = imgWrapper.findAll("td");
        expect(tagarray.length).toBe(6);
        // 5. Layout - text
        let alltd = imgWrapper.findAll('td');
        expect(alltd.at(0).text()).toBe("Title");
        expect(alltd.at(1).text()).toBe(sampleResult.title);
        expect(alltd.at(2).text()).toBe("Information");
        expect(alltd.at(3).text()).toBe(sampleResult.detailExplanation);
        expect(alltd.at(4).text()).toBe("Copyright");
        expect(alltd.at(5).text()).toBe(sampleResult.copyright);
        // 6. Layout - image

    });
});

