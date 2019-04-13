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
        // 2. 
    })
    // 1. Validate instance
    

});
