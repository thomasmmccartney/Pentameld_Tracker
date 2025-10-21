# Pentameld Tracker

This is a test application migrating an existing tool written in a spreadsheet to use ASP.NET Core and React. This takes the logic used to calculate pentamelds in the video game Final Fantasy XIV and helps the user understand and work around it.

## Goals
The goal of this application is to practice React and general web dev. As most of my commerical experience is in desktop applications this helps fill the gap in my knowledge.

## Requirements
Pentamelding involves using an in-game item (known as materia) to power up a piece of equipment. This is known as melding and must be done 5 times for each piece. As you meld more into a piece the odds you are sucessful decrease, and these are different for different equipment types

The aim of the application is to allow the user to enter equipment they want to pentameld, select which item they want to meld into the equipment for each of the 5 possible times, and then output the number of items they need on average to successfully pentameld

### Must-Have
* A table to enter the user's equipment and melds. This should be maintained. ![alt text](https://github.com/thomasmmccartney/Pentameld_Tracker/blob/master/Documentation/Table.png "Input")

* Save previous inputs to then use during a later session. This should instead output a file a user can import.

* The existing tool provides an output of the number of materia needed based on the user inputs. ![alt text](https://github.com/thomasmmccartney/Pentameld_Tracker/blob/master/Documentation/Output.png "Output")

### Should-Have

* Output ways to get the required materia and the converting the number needed to this method. For example if materia is purchaseable with a currency, the user should be told how much of that currency they will need on average for their melds.

* The app should be aesthetically pleasing, useable, and clear.

* The user can input a number of the same equipment with identical melds rather than entering each indiviually, for cases such as main-hand tools where you can have up to 8 identical pentamelds required.

 ### Could-Have

* Support for gatherer and combat melds. Since crafter melds are the most common type this is supported, but allowing for the user to select a role and update the materia avaiable accordingly.

* Custom methods to obtain materia, to support future methods easily.

* Connect with the [FFXIV API](https://v2.xivapi.com/) to obtain data about specific materia and equipment including images and information.
