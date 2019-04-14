import { shallowMount, mount } from '@vue/test-utils'
import Vue from "vue"
import app from "./src/App.vue"
import { exportAllDeclaration } from '@babel/types';

describe("ImageDay Basic Layout Verification", () => {
    ////////////////////////////////////////////////////////////////////
    // Prepare inital setup
    // 1. Mount the app
    let appWrapper = mount(app)

    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    // Basic App Property Checking
    test("App Property Verification", () => {
        // 1. Validate instance
        expect(appWrapper.isVueInstance()).toBeTruthy();
        // 2. Div Tag - Visiblity, count, attribute
        expect(appWrapper.html().includes("div")).toBe(true);
        expect(appWrapper.attributes().id).toBe("app");
        expect(appWrapper.find("div").isVisible()).toBe(true);
        let divarray = appWrapper.findAll("div");
        expect(divarray.length).toBe(4);
        console.log(appWrapper.html());
        // 6. Table, Row and column Tag - Visiblity, count, attribute
        expect(appWrapper.html().includes("table")).toBe(true);
        expect(appWrapper.findAll('table').length).toEqual(1);
        //expect(appWrapper.classes()).toContain('table table-bordered');
        //expect(appWrapper.classes('table table-bordered')).toBe(true);
        
        
    })
    // 1. Validate instance
    

});
