a = "hua "
b = "dai "
c = "thang "
# puts a.concat(b)
# or << 
puts a << b << c
#  conpare
puts a <=> b
puts a <=> a
puts "abc" <=> "edf"

# Chomp
a = "sadasdsa\n\r\b"
puts a
puts a.chomp