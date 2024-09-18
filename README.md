# FPPC Behested Payment Scraper

The FPPC has [a webpage to download behested payments as an Excel file](https://www.fppc.ca.gov/transparency/form-700-filed-by-public-officials/behested-payments.html) but the data seems delayed, doesn't have all of the behested payments compared to other search tools, and has known errors.

All of the payments _do_ seem to be available by searching for particular politicans during particular years, such as [this search for payments behested by Gavin Newsom in 2024](https://dv.fppc.ca.gov/Detail?Year=2024&Name=Newsom,%20Gavin). This script searches all officials who reported behested payments since 2011 and saves them to [`behested.csv`](https://github.com/CalMatters/fppc-behested-payments/blob/main/behested.csv).

An example of a known error in the downloadable data is a $5,000,000,000 behested payment from the Waverley Street Foundation to California Volunteers in May 2024 though the FPPC's web tool for searching behested payments states that the value is $5,000,000, which makes a lot more sense and is used in this data set.

## Data dictionary

These are the columns that can be found in `behested.csv`.

Columns | Description
-- | --
Name | Official's name
Amount | Behested payment amount
Payment Date | When the behested payment was made
Payor | The party that gave money
Payor City | The giving party's city
Payor State | The giving party's state
Payee | The party that got money
Payee City | The receiving party's city
Payee State | The receiving party's state
Description | A description of the reason
Notice Received | When the FPPC received the filing reported by the official
LGC Purpose | TKTK


## Data use
If you use this dataset, please mention it was collected and cleaned by CalMatters. If you have any questions about this dataset, feel free to contact us.

CalMatters is a nonpartisan, nonprofit journalism venture committed to explaining how California’s state Capitol works and why it matters.
