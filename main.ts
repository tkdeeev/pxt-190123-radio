radio.setTransmitPower(5)
radio.setFrequencyBand(7)
radio.setTransmitSerialNumber(true)
radio.setGroup(3)

let actualCode = 0
let nextCode = 0
let nextGrp = 0
let receiveGrpEnabled = false

const mySerial = 1923479546458 //control.deviceSerialNumber()

input.onButtonPressed(Button.A, () => {
    basic.showNumber(actualCode, 200)
    basic.showString("", 0)
    radio.sendValue("80", mySerial)
    radio.sendValue("grp", 4)
})
basic.forever(function() {
    basic.pause(400)
    radio.sendValue("81", randint(10, 9999999999))
    radio.sendValue("grp", 999)
    radio.sendNumber(7)

})
/*radio.onReceivedNumber((receivedNumber: number) => {
    basic.showNumber(receivedNumber, 200)
    basic.showString("", 0)
    radio.sendNumber(receivedNumber + 1)
})*/

// beacon: 
// <= "7" + serial
//value = string { newgrp, newcode }, int = serial
// => "grp" : <group> & <serial> : <newCode>
radio.onReceivedValue(function (recStr: string, recNum: number) {
    if (recNum == mySerial) {
        receiveGrpEnabled = true
        console.logValue("Received serial", recStr + " : " + recNum + "\n\r")
        const remoteID = radio.receivedPacket(RadioPacketProperty.SerialNumber)
        console.logValue("Remote ID", remoteID + "\n\r")
        nextCode = parseInt(recStr)

    } else if (recStr == "grp" && receiveGrpEnabled) {
        nextGrp = recNum
        receiveGrpEnabled = false
        console.logValue("Received grp", recNum + "\n\r")
    }
})

console.logValue("Serial number", mySerial + "\n\r")

