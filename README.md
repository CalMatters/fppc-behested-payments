# FPPC Behested Payment Scraper

The FPPC has [a webpage to download behested payments](https://www.fppc.ca.gov/transparency/form-700-filed-by-public-officials/behested-payments.html) but the data seems delayed and doesn't have all of the behested payments. However, all of the payments do seem available by searching for particular politicans during particular years, such as [this one for Gavin Newsom in 2024](https://dv.fppc.ca.gov/Detail?Year=2024&Name=Newsom,%20Gavin). This script searches all officials who reported behested payments since 2011.

## Data dictionary

These are the columns that can be found in `behested.csv`.

Columns | Description
-- | --
Name | Official's name
Amount | Value
Payment Date | When the behested payment was made
Payor | The party that gave money
Payor City | That party's city
Payor State | That party's state
Payee | The party that got money
Payee City | That party's city
Payee State | That party's state
Description | A description of the reason
Notice Received | When the FPPC received the filing
LGC Purpose | TKTK