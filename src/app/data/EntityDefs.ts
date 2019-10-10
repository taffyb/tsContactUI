export const ENTITY_DEFS={
    "entityDefs": [
       {
           "name": "Event",
           "uuid": "3058febf-2b73-4214-b06f-d3cd7610125d",
           "props": {
               "Date": [
                   {
                       "name": "Date",
                       "type": "date",
                       "order": 2
                   }
               ],
               "Name": [
                   {
                       "name": "Name",
                       "type": "string",
                       "required": true,
                       "order": 1
                   }
               ],
               "Description": [
                   {
                       "name": "Description",
                       "type": "memo",
                       "order": 3
                   }
               ]
           }
       },
       {
           "name": "Organisation",
           "uuid": "93acc14b-9290-40ad-9d2a-a07979aaac64",
           "props": {
               "Address": [
                   {
                       "name": "Address",
                       "type": "memo",
                       "order": 2
                   }
               ],
               "Notes": [
                   {
                       "name": "Notes",
                       "type": "memo",
                       "order": 3
                   }
               ],
               "Name": [
                   {
                       "name": "Name",
                       "type": "string",
                       "required": true,
                       "order": 1
                   }
               ]
           }
       },{
           "name": "Person",
           "uuid": "cb62bfdd-3858-4f39-9f6e-fff3d1aba2a3",
           "props": {
             "Firstname": [
               {
                 "name": "Firstname",
                 "label": "First Name",
                 "type": "string",
                 "required": true,
                 "order": 1
               }
             ],
             "Surname": [
               {
                 "name": "Surname",
                 "type": "string",
                 "order": 2
               }
             ],
             "pemail": [
               {
                 "name": "pemail",
                 "label": "Personal Email",
                 "type": "email",
                 "order": 6
               }
             ],
             "DOB": [
               {
                 "name": "DOB",
                 "label": "Date of Birth",
                 "type": "date",
                 "order": 3
               }
             ],
             "Notes": [
               {
                 "name": "Notes",
                 "type": "memo",
                 "order": 4
               }
             ],
             "wemail": [
               {
                 "name": "wemail",
                 "label": "Work Email",
                 "type": "email",
                 "order": 5
               }
             ]
           }
         }
    ]
}